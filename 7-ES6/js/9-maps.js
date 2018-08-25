// map data structure

/*
new key-value data structure, but we aren't limited to using strings as keys
we can use numbers, booleans, functions etc

maps have more functionality than objects:
- the flexibility in key data types allows for complex use cases
- they are iterable
- the size property can be useful

also, order is preserved in a map.

However objects are lower level and faster in many cases
objects also support inner logic ( with the this keyword )

*/

const question = new Map();

question.set('question', 'What is the official name of the latest major JS version?');

question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');

question.set('answer', 3);

question.set(true, 'Correct answer');
question.set(false, 'Wrong, please try again');

/*
// some Map methods

let size = question.size;

question.delete(4);

if (question.has(4))
  question.delete(4);

question.clear();
*/

// maps are iteratable, unlike objects

function iterateForEach() {
  question.forEach((value, key) =>
    console.log(`This is ${key} and it's set to ${value}`)
  );
}

function quiz() {
  for (let [key, value] of question.entries()) {
    if (typeof key === 'number')
      console.log(`Answer ${key}: ${value}`);
  }
  const ans = parseInt(prompt('Write the correct answer'));

  console.log(
    question.get(ans === question.get('answer'))
  );
}
