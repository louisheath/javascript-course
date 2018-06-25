/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
DOM
Document Object Model
- an object oriented representation of the html page
- a tree of tags
*/

var scores, roundScore, activePlayer, isGameOver, previousSix, targetScore;

targetScore = 100;

reset();

function reset() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  previousSix = false;
  isGameOver = false;

  var die = document.getElementsByClassName('dice');
  die[ 0 ].style.display = 'none';
  die[ 1 ].style.display = 'none';

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.input').placeholder = targetScore;

  for (var i = 0; i < 2; i++) {
    document.getElementById('name-' + i).textContent = 'Player 1';
    document.getElementById('current-' + i).textContent = 0;
    document.getElementById('score-' + i).textContent = 0;
    document.querySelector('.player-'+ i +'-panel').classList.remove('winner');
  }
}

function changePlayer() {
  previousSix = false;
  activePlayer = 1 - activePlayer;
  var die = document.getElementsByClassName('dice');
  die[ 0 ].style.display = 'none';
  die[ 1 ].style.display = 'none';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function gameOver() {
  isGameOver = true;
  document.getElementById('name-' + activePlayer).textContent = 'Winner';
  var die = document.getElementsByClassName('dice');
  die[ 0 ].style.display = 'none';
  die[ 1 ].style.display = 'none';
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (isGameOver) return;

  // generate new rolls
  var newRolls = [ Math.floor(Math.random() * 6) + 1,
                   Math.floor(Math.random() * 6) + 1 ];
  newRolls[ 0 ] === 1 || newRolls[ 1 ] === 1 ? roundScore = 0
                                             : roundScore += newRolls[ 0 ] + newRolls[ 1 ];

  // display new rolls and score
  document.getElementById('current-' + activePlayer).textContent = roundScore;
  var die = document.getElementsByClassName('dice');
  for (var i = 0; i < 2; i++) {
    die[ i ].style.display = 'block';
    die[ i ].src = 'dice-' + newRolls[ i ] + '.png';
  }

  // if there's a six, count
  newRolls[ 0 ] === 6 || newRolls[ 1 ] === 6 ? consecutiveSixes++
                                             : consecutiveSixes = 0;

  // check for unlucky rolls
  if ( newRolls[ 0 ] === 6 || newRolls[ 1 ] === 6 ) {
    if ( previousSix ) {
      console.log('consecutive 6');
      scores[ activePlayer ] = 0;
      document.getElementById('score-' + activePlayer).textContent = 0;
      changePlayer();
    } else {
      previousSix = true;
    }
  }
  if ( newRolls[ 0 ] === 1 || newRolls[ 1 ] === 1 ) {
    console.log('rolled a 1');
    changePlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (isGameOver) return;

  scores[ activePlayer ] += roundScore;
  roundScore = 0;
  document.getElementById('score-'   + activePlayer).textContent = scores[ activePlayer ];
  document.getElementById('current-' + activePlayer).textContent = '0';

  if (scores[ activePlayer ] >= targetScore) {
    gameOver();
  } else changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
  // read input box for new target score
  var newTarget = parseInt(document.querySelector('.input').value);
  if (!isNaN(newTarget)) {
    targetScore = newTarget;
    document.querySelector('.input').value = null;
  }
  reset();
  isGameOver = false;
});

// a handy function for hovering
var delay = function (elem, callback) {
    var timeout = null;
    elem.onmouseover = function() {
        // Set timeout to be a timer which will invoke callback after 1s
        timeout = setTimeout(callback, 500);
    };

    elem.onmouseout = function() {
        // Clear any timers set to timeout
        clearTimeout(timeout);
    }
};
delay(document.querySelector('.btn-help'), function() {
    document.querySelector('.help-box').style.display = 'block';
    document.querySelector('.btn-help').onmouseout = closeHelp;
});

// function to close the help box
function closeHelp() {
  document.querySelector('.help-box').style.display = 'none';
}

// gets the first element it finds
//document.querySelector('#current-' + activePlayer).textContent = dice;

// getElementById is faster
//document.getElementById('score-0')..

// allows string to be reinterpreted as html
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// we use event listeners. they are functions which wait for events
//   besides execution stack we have the message queue.
//     events in the browser are queued here
//     they are only processed once execution stack is empty

// a callback function is one which we pass as an argument to be called later

//document.querySelector('.player-' + prevPlayer + '-panel').classList.remove('active');
//document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
