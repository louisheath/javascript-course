// arrays

/*
ES6 brings some new Array methods as well as a for loop for iterables
*/

const boxes = document.querySelectorAll('.box');

/*
  List to array conversion
*/

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
// forEach

//ES6
var boxesArr6 = Array.from(boxes);

boxesArr6.forEach(cur =>
  cur.style.backgroundColor = 'dodgerBlue'
);

/*
  Looping
*/

// we cannot use 'break' in forEach or map
// so sometimes we need a traditional loop

// ES5
function loop5() {
  for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[ i ].className === 'box blue') {
      continue;
    }
    boxesArr5[ i ].textContent = 'I am now blue!';
  }
}

//ES6 'for of' loop

/*
'for in' loops over properties of enumerable data types, including inherited properties
- objects, (arrays), strings..

'for of' loops over iterable collections
- maps, arrays, nodelists!

for of preserves order, so is favoured for use with arrays
*/

function loop6() {
  for (const cur of boxesArr6) {
    if (cur.className.includes('blue'))
      continue;
    cur.textContent = 'I am now blue!';
  }
}

/*
  Array methods
*/

// ES5 arrays only had 'indexOf'

var ages = [12, 17, 8, 21, 14, 11];

function findIndex5() {
  var full = ages.map(function(cur) {
    return cur >= 18;
  });
  console.log(full);

  console.log(full.indexOf(true));
  console.log(ages[full.indexOf(true)]);
}

// ES6 find() and findIndex()
function findIndex6() {
  console.log(ages.findIndex(cur => cur >= 18));
  console.log(ages.find(cur => cur >= 18));
}
