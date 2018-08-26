// lets fold baby

/*
essentially foldl from Haskell

not actually new in ES6?

in the example below, 0 is set to be the -1th element

[ 1, 2, 3 ]
 -> [ 0, 1, 2, 3]
 -> [ 0 + 1, 2, 3]
 -> [ 1 + 2, 3];
 -> 6
*/

const arr = [1, 2, 3];

const sum = arr.reduce((prev, cur, index) =>
  prev + cur, 0);

console.log(sum);
