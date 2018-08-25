// classes

/*
make it easier to do prototypal inheritance

they also allow for definition of static methods

class definitons are not hoisted, unlike function constructors

they are only syntactical sugar
- js is not truly class based, it is prototype-based
*/

//ES5
var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}
Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
}

// ES6
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calculateAge() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }

  static greeting() {
    console.log('Hey there!');
  }
}

//Person6.greeting();


// subclasses

/*
allow class inheritance

(when inherited functions are used, 'this' is the inheriting obj, not the inherited)
*/

//ES5

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
  Person5.call(this, name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
}

// create new object with the same prototype (not a copy of the proto - a reference)
Athlete5.prototype = Object.create(Person5.prototype);

// a new property is added to Athlete5
// The Person5 prototype and Athlete5's reference to it are unchanged
Athlete5.prototype.wonMedal = function() {
  this.medals++;
  console.log(this.medals);
}

var johnAthlete5 = new Athlete5('John', 1990, 'Swimmer', 3, 10);

// ES6

class Athlete6 extends Person6 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  }

  wonMedal() {
    this.medals++;
    console.log(this.medals);
  }
}

const johnAthlete6 = new Athlete6('John', 1990, 'Swimmer', 3, 10);
