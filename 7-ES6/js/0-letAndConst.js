// let and const

/*
block scoped rather than function scoped

are hoisted, but cannot be used before declared a value

const is not mutatable - cannot be reassigned
*/

function mutationBasics() {
  var name5 = 'Jane Smith';
  var age5 = 23;
  name5 = 'Jane Miller';
  // vars can be mutated

  const name6 = 'Jane Smith';
  let age6 = 23;
  name6 = 'Jane Miller'; // error
  // consts cannot be reassigned
  // let can be reassigned
}

// var is function scoped
// let and const are block scoped

function driversLicense5(passedTest) {
  if (passedTest) {
    var firstName = 'John';
    var yearOfBirth = 1990;
  }
  console.log(firstName, yearOfBirth);
}

function driversLicense60(passedTest) {
  if (passedTest) {
    let firstName = 'John';
    const yearOfBirth = 1990;
  }
  console.log(firstName, yearOfBirth);
  // let and const are not reachable here
  // - they are only hoisted within their block
}

function driversLicense61(passedTest) {
  console.log(firstName); //error
  // although let is hoisted, it cannot be accessed until defined
  // - it is in a 'temporal dead zone'
  let firstName;
  if (passedTest) {
    firstName = 'John';
    const yearOfBirth = 1990;
  }
}

function loopingScope5() {
  var i = 23;

  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log(i);
  // var is overwritten, as both i variables are in the
  // same function scope
}

function loopingScope6() {
  let i = 23;

  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log(i);
  // the second let is in a new block scope
  // - the most local version is used
}
