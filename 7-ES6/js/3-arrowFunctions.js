// arrow functions

/*
provide a prettier way to write functions

borrow 'this' from surroundings
*/


const years = [1990, 1965, 1982, 1937];

function arrowBasics() {
  // ES5
  let ages5 = years.map(function(year) {
    return 2018 - year;
  });

  //ES6

  let ages6 = years.map(year =>
    2018 - year
  );
  console.log(ages6);

  ages6 = years.map((year, index) =>
    `Age element ${index + 1}: ${2018 - year}.`
  );
  console.log(ages6);

  ages6 = years.map(year => {
    let x = 2;
    return year + x;
  });
  console.log(ages6);
}

// arrow functions do not have a lexical 'this' keyword,
// so they use that of their surroundings

var box5 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    // within method, 'this' is the object
    // so self has to be used
    var self = this;
    alert(this.color);
    document.querySelector('.green').addEventListener('click',
      function() {
        // callback is not a method, so 'this' is the window obj
        var str = 'This is box number ' + self.position + ' and it is ' + self.color;
        alert(str);
      });
  }
}

var box6 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    // arrow functions share the 'this' of their surroundings
    // if we made clickMe() into an arrow function, 'this' would be the global window
    document.querySelector('.green').addEventListener('click',
      () => {
        // callback is not a method, so 'this' is the window obj
        let str = `This is box number ${this.position} and it is ${this.color}`;
        alert(str);
      });
  }
}

function Person(name) {
  this.name = name;
}

Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(el) {
    return this.name + ' is friends with ' + el;
  }.bind(this));
  console.log(arr);
}

Person.prototype.myFriends6 = function(friends) {
  let arr = friends.map(el =>
    `${this.name} is friends with ${el}`
  );
  console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
var john = new Person('John');
