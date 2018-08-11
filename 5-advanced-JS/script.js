/*
notes

primitives:
 number
 string
 boolean
 undefined
 null

everything else is an object

constructor = class

PROTOTYPE CHAIN
every object has a prototype property which enables inheritance
we put methods that we want inherited in the prototype property.
when properties are used, js searches within the object, and then through parents and grandparents' prototypes until found

Constructors (classes) can be defined with functions :

*/

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  this.calculateAge = function() {
    console.log(2018 - this.yearOfBirth);
  }
}

var john = new Person('John', 1990, 'teacher');

/*
the 'new' keyword changes 'this' from the global object to that of the new object.
*/

Person.prototype.sayHi = function() {
  console.log('Hi');
}

// you can also create objects, specifying their prototype, as follows:

var personProto = {
  calculateAge: function() {
    console.log(2018 - this.yearOfBirth);
  }
}

var jane = Object.create(personProto,
{
  name: { value: 'Jane' },
  yearOfBirth: { value: 1969 },
  job: { value: 'Designer' }
});

// objects are references to memory, whereas pointers are true values

var obj1 = {
  value: 'hi'
}
var obj2 = obj1;
obj2.value = 'changed'; // this changes both copies
//console.log(obj1);

// this applies to function paramters too
//  primitives will be fresh copies, but object references will stay references

var age = 20;
var obj3 = {
  value: 'old'
}
function change(age, obj) {
  age = 23;
  obj.value = 'new';
}
//console.log(age, obj3);
change(age, obj3);
//console.log(age, obj3);

// FIRST CLASS FUNCTION
//  is and behaves like an object
//  can be stored as a var
//  can be passed as an arg
//  can be returned from other functions

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++)
    arrRes.push(fn(arr[i]));
  return arrRes;
}

function calculateAge(el) {
  return 2018 - el;
}

var ages = arrayCalc(years, calculateAge);

function interviewQuestion(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(name + ', can you please explain what UX is?');
    }
  } else if (job === 'teacher') {
    return function(name) {
      console.log('What subject do you teach, ' + name + '?');
    }
  } else {
    return function(name) {
      console.log('Hello ' + name + ', what do you do?');
    }
  }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

//teacherQuestion('John');
//interviewQuestion('teacher')('Mark');


//Immediately Invoked Function Expressions IIFE
/*
(function() {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

what is inside brackets cannot be a statement, therefore JS treats it as an expression, not a declaration
Otherwise, the anonymous function would throw an error alone
*/

// CLOSURE
/*
 A closure is a function having access to the parent scope,
  even after the parent function has closed.

 An inner function always has access to the variables and parameters
  of its outer function ,even after the outer function has returned

 So although the outer function's execution context has ended, its position in the scope chain persists
*/

function retirement(retirementAge) {
  var a = ' years left until retirement';
  return function(yearOfBirth) {
    var age = 2018 - yearOfBirth;
    console.log((retirementAge - age) + a);
  }
}

var retirementUS = retirement(66);
var retirementDE = retirement(65);
var retirementIC = retirement(67);

// retirementUS(1990);
// retirementDE(1990);
// retirementIC(1990);

/*
METHOD BORROWING with call, apply and bind
*/

var john = {
  name: 'john',
  speak: function(like1, like2) {
    console.log('Hi my name is ' + this.name +
    ', I like ' + like1 + ' and ' + like2);
  }
};
var emily = {
  name: 'emily'
}
// john.speak.call(emily, 'cats', 'dogs');
//john.speak.apply(emily, ['cats', 'dogs']) apply only works when function expects an array

var emilySpeak = john.speak.bind(emily, 'cats');
// emilySpeak('dogs');
// emilySpeak('wabbits');
// bind allows currying, like in haskell

/*
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++)
    arrRes.push(fn(arr[i]));
  return arrRes;
}*/

function isFullAge(limit, el) {
  return el >= limit;
}

// console.log(arrayCalc(ages, isFullAge.bind(this, 18)));
