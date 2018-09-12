console.log('bambambam');

var firstName = 'Louis';

console.log(firstName);

var age = 19;

console.log(age);

/*
vars are one of:
  Number    - always a float
  String
  Boolean
  Undefined
  Null
*/

var fullAge = true;

console.log(fullAge);

var job;

console.log(job);

job = null;

console.log(job);

/*
variable names cannot include symbols or begin with numbers
  with the excpetions of $ and _
*/

// type coercion is magical
console.log(firstName + ' ' + age);

var job, isMarried;
job = "software engineer";
isMarried = false;

console.log(job + ' ' + isMarried);

age = 'nineteen';

console.log(age);

//alert('hey, hey apple');

//var lastName = prompt('What is his last name?');

//console.log(lastName);

// get type of a variable
console.log(typeof age);

// order of operations

var now, yearJohn, legalAge;
now = 2018;
yearJohn = 1998;
legalAge = 18;
var isFullAge = now - yearJohn >= legalAge;

console.log(isFullAge);

var ageMark = 19;
var average = (ageMark + now - yearJohn) / 2;

console.log(average);

/*
You can delete properties from objects !
*/

delete average;
console.log(average);

// BMI = mass / height^2
//  mass in kg, height in m

var massMark, massJohn, heightMark, heightJohn;
massMark = 80;
massJohn = 90;
heightMark = 1.84;
heightJohn = 2.05;

var bmiMark, bmiJohn;
bmiMark = massMark / heightMark ** 2;
bmiJohn = massJohn / heightJohn ** 2;

console.log('Mark ' + bmiMark);
console.log('John ' + bmiJohn);

/*
TERNARY OPERATOR
*/

var age = 16;

age >= 18 ? console.log('legal')
          : console.log('underage');

var drinkMark = ageMark >= 18 ? 'beer'
                              : 'juice';
console.log('Mark drinks '+drinkMark);

/*
SWITCH STATEMENT
*/

switch (job) {
  case 'software engineer' :
    console.log('do you need an eye test?');
    break;
  case  'unemployed' :
    console.log('go get a job');
    break;
  default :
}

switch (true) {
  case age < 13 :
    console.log('little baby');
    break;
  case age < 20 :
    console.log('you think you\'re so hard');
    break;
  default :
    console.log('you old hag');
}

/*
FALSY values evaluate to false
undefined, null, 0, '', NaN

TRUTHY values  evalute to true
not falsy values
*/

var height;

if (height) {
  console.log('variable height has been defined');
} else {
  console.log('height is undefined or falsy');
}

/*
=== requires for types to match
== does not
*/
height = 23;
if (height == '23') {
  console.log('== does type coercion');
}

var johnScores = [89, 120, 103];
var mikeScores = [116, 94, 123];
var maryScores = [97, 134, 105];
var johnAvg, mikeAvg, maryAvg;

for (var i = 0; i < 3; i++) {
  johnAvg += johnScores[i] / 3;
  mikeAvg += mikeScores[i] / 3;
  maryAvg += maryScores[i] / 3;
}

if (johnAvg > mikeAvg) {
  console.log('John wins');
} else if (mikeAvg > johnAvg) {
  console.log('Mike wins');
} else {
  console.log('Draw');
}

if (johnAvg > mikeAvg && johnAvg > maryAvg) {
  console.log('John wins');
} else if (mikeAvg > johnAvg && mikeAvg > maryAvg) {
  console.log('Mike wins');
} else if (maryAvg > johnAvg && maryAvg > mikeAvg) {
  console.log('Mary wins');
} else {
  console.log('Draw');
}

function calculateAge(birthYear) {
  var now = 2018;
  return now - birthYear;
}

console.log(calculateAge(1998));



// Function expression
var whatDoYouDo = function(job, firstName) {
  console.log(firstName + ' is a ' + job);
}

whatDoYouDo('teacher', 'John');

// function expressions produce an immediate result
// func delcarations do not

/*
array.pop()
array.push(arg)
array.unshift(arg)
array.shift()
array.indexOf()
*/

var bills = [124, 48, 268];
var tips = [];
var paid = [];

for (var i = 0; i < bills.length; i++) {
  var bill = bills[i];
  var tip;
  switch (true) {
    case bill < 50 :
      tip = bill * 0.2;
      break;
    case bill < 200 :
      tip = bill * 0.15;
      break;
    default :
      tip = bill * 0.1;
  }
  tips.push(tip);
  paid.push(bill + tip);
}

console.log(bills);
console.log(tips);
console.log(paid);

/*
objects store key value pairs
*/

var john = {
  firstName : 'John',
  lastName : 'Smith',
  birthYear : 1998,
  age : 20,
  family : [
    'Jane',
    'Mark',
    'Bob',
    'Emily'
  ],
  job : 'teacher',
  isMarried : false,
  calcAge : function(currentYear) {
    this.age = currentYear - this.birthYear;
  }
};

john.calcAge(2022);
console.log(john);
console.log(john.firstName);
console.log(john['lastName']);

var mark = {
  mass : 81,
  height : 1.84,
  calcBMI : function() {
    this.bmi = this.mass / this.height ** 2;
  }
};

var john = {
  mass : 90,
  height : 1.99,
  calcBMI : function() {
    this.bmi = this.mass / this.height ** 2;
  }
};

mark.calcBMI();
john.calcBMI();
console.log(mark);
console.log(john);

// loops

function double(i) {
  return 2 * i;
}

for (var i = 1; i < 10; i = double(i)) {
  if (i == 2) continue;
  console.log(i);
}

// for (x in xs) loops through properties of an object

var johnTips = {
  billValues : [124, 48, 268, 180, 42],
  tips : [],
  finalAmounts : [],
  calculate : function () {
    for (var i = 0; i < this.billValues.length; i++) {
      var bill = this.billValues[ i ];
      switch (true) {
        case bill < 50 :
          this.tips[ i ] = bill * 0.2;
          this.finalAmounts[ i ] = bill + this.tips[ i ];
          break;
        case bill < 200 :
          this.tips[ i ] = bill * 0.15;
          this.finalAmounts[ i ] = bill + this.tips[ i ];
          break;
        default :
          this.tips[ i ] = bill * 0.1;
          this.finalAmounts[ i ] = bill + this.tips[ i ];
      }
    }
  }
};

johnTips.calculate();
console.log(johnTips);
