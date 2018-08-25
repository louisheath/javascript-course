// strings

/*
ES6 brings a new suite of string methods, as well as template literals
*/

let firstName = 'John';
let lastName = 'Smith';

const yearOfBirth = 1990;

function calculateAge(year) {
  return 2018 - year;
}

function templateLiterals() {

  // template literals

  // ES5
  console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' +
   yearOfBirth + '. Today he is ' + calculateAge(yearOfBirth) + ' years old');

  // ES6
  console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}.`+
    `Today he is ${calculateAge(yearOfBirth)} years old`);

}

// cool new string methods
function testStringFunctions() {
  const n = `${firstName} ${lastName}`;
  console.log(n.startsWith('J'));
  console.log(n.endsWith('h'));
  console.log(n.includes(' '));
  console.log(n.startsWith('Jo'));
  console.log(`${firstName} `.repeat(5));
}
