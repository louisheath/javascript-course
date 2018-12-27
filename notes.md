A summary of (some of) the most key learning points from this course

## Variables

### Types

There are five primitives;
- undefined
- null
- boolean
- number (includes `Infinity` and `NaN`)
- string

Everything else is an object, i.e. they inherit from the Object prototype. This includes Arrays and Functions.

Objects are passed by reference ('sharing'), whereas primitives are passed by value.

An object is not a primitive, but an aggregation of properties. These properties can be objects themselves, or primitives.

Primitives are sometimes temporarily coerced into objects by JavaScript, for example when getting the length of a string by its `length` property.

### Coercion Notes

`'true' == true // false`

`[1] == '1' == 1 // true`

### Falsy values

All falsy values evaluate to false.

`false`, `undefined`, `null`, `0`, `''`, `NaN`

Everything else is truthy

### Hoisting

Hoisting happens when a new execution context is made. Variables within it are set to `undefined` and functions are pointed to.

Though function *expressions* are hoisted, they are instantiated as `undefined` and so **cannot** be called early.

Function *declarations* will have a pointer assigned to them, and so can be called early.

```js
function declaration() {
    console.log('I can be called early');
}

const expression = () => {
    console.log('I cannot be called early);
};
```

### Prototype

Every object has a prototype property which enables inheritance.

We can put methods in a prototype to be inherited by all objects of or inheriting from it.

If a property is not present within an object, JavaScript will refer up the chain, searching for any other definitions of the property.

`.hasOwnProperty()` excludes inherited properties.

In ES5 we can use constructors to create 'classes' of a sort. These are improved in ES6 by the `class` notation.

When creating a new object, the `new` keyword changes `this` to that of the newly created context.

## Functions

### Execution Context

A new execution context is created for each function call and placed on the execution stack. The global EC tends to be the `window` object.

On creation;

1. A variable object is created
    - arguments are prepared
    - hoisting occurs
2. The scope chain is adjusted
3. The new `this` variable is set

Note:

Within an object's method, `this` is the object itself. A function defined *within* that method, however, has a `this` value pointing to the global EC.

### Closures

An inner function *always* has access to the variables and parameters of its outer function, even after the outer function has returned.

### Method Borrowing

Object methods can be borrowed in various ways.

```js
const john = {
    name: 'john',
    speak: function(a, b) {
        console.log(`${this.name} likes ${a} and ${b}`);
    }
};
const emily = {
    name: 'emily'
};
```

`call()` simply changes `this`, and takes the necessary parameters.

`apply()` is similar, but takes the function parameters in the form of an array, allowing more flexibility.

`bind()` allows the currying of parameters, like in Haskell.

```js
john.speak.call(emily, 'cats', 'dogs');

john.speak.apply(emily, ['cats', 'dogs']);

const emilySpeak = john.speak.bind(emily, 'cats');
emilySpeak('dogs');
```

## Loops

### forEach() vs map()

Both are array methods, but map returns a new array.

### 'for in' vs 'for of'

`for ... in` loops over the keys of an enumerable object. It does so in an arbitrary order, and will also loop over inherited enumerable properties.

This is not ideal for Arrays as order is not guaranteed, and the looping variable is the index, rather than the value.

```js
for (let i of arr) {
    console.log(arr[ i ])
}
```

`for ... of` iterates over iterable collections. This does not include Objects. It is useful however for arrays and strings.

```js
for (let item of arr) {
    console.log(item);
}
```

It is also useful for looping through NodeLists, which do not inherit from Array.

## DOM 

### Event listeners

Event listeners are functions which wait for events

Separate to the execution stack we have the *message queue*.

Events in the browser such as clicks and hovers are queued here.

They are only processed once execution stack is empty.

### Event delegation and bubbling

DOM events 'bubble' up the DOM tree.

This is useful when we want to detect events in multiple elements which may not yet exist. We attach a listener to a parent element, and check the `target` attribute of the event.

### Element.closest()

Given a css selector as parameter, it finds the nearest ancestor matching that selector

### Element.matches()

Checks if the element satisfies some given css selectors. returns boolean.

### Element.datasets

Placing this in an HTML element allows us to store data in the template.

E.g. `<... data-foo=1 />` can be retrieved in JS with `const foo = el.datasets.foo;`

## ES6

### let and const

`let` and `const` are block scoped, rather than function scoped. This includes `for` loops and `if else` statements.

Also, despite being hoisted within theit block, they cannot be used until initiated. Before then they are in a 'temporal dead zone'.

`const` cannot be reassigned, however can be mutated via methods such as `pop()`.

Variables can only be declared with `let` once, otherwise an error will be thrown.

### String features

1. template literals `${}`
2. `.startsWith()`
3. `.endsWith()`
4. `.includes()`
5. `.startsWith()`
5. `.repeat()`

### Arrow functions

Arrow functions do not have a lexical `this` and so borrow it from their surrounding scope.

This means that the `arguments` object within an arrow function are the arguments belonging to the parent scope.

i.e. `john.speak()` in the example above would not function.

However arrow functions can *sort of* be used to create methods within an object **with** a bound `this` keywork, as shown below.

```js
let user = {
    name: 'John',
    sayHi () {
        console.log(`Hi, i'm ${this.name}`);
        // John
        console.log(arguments);
        // args passed into sayHi
    },
    sayHiBad: () => {
        console.log(`Hi, i'm ${this.name}`);
        // undefined
        console.log(arguments);
        // global args
    }
}
```

### Destructuring

Like in python, we can break up a data structure into multiple variables

```js
const [name, age] = ['John', 26];

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const { firstName, lastName } = obj;
const { firstName: a, lastName: b } = obj;
```

### Array features

`Array.from()` allows easy conversion, e.g from a NodeList.

- `find()`
- `findIndex()`

### Spread operator

Used for expanding elements of an array

```js
const ages = [ 18, 30, 12, 21 ];

const moreAges = [ 17, 25, ...ages ];
```

### Rest paramaters

The inverse of the spread operator - allows us to combine an arbitrary number of parameters into an array.

```js
function isFullAge(limit, ...years) {
  years.forEach(cur => console.log((2018 - cur) >= limit));
}
```

### Default parameters

```js
function(name, age = 20) {
    console.log('age will default to 20 if undefined');
}
```

### Maps

Maps are a new key-value data structure whose keys can be strings, numbers, booleans, functions etc

They have more functionality than objects:
- the flexibility in key data types allows for complex use cases
- they are iterable (`.forEach()`)
- the size property can be useful
- order is preserved

However objects are lower level and often more optimised for speed.

Objects also support inner logic (with the `this` keyword)

```js
const question = new Map();

question.set(true, 'foo');
question.set(4, 'bar');

if (question.has(4))
    question.delete(4);
if (question.size > 0)
    question.clear();
```

### Classes

Make inheritance easier with `extends`.

Allow for static methods.

*Are only syntactical sugar*. JS is prototype-based, not class-based.

Class definitions are not hoisted, unlike function constructors.

```js
class Person {
    constructor(name) {
        this.name = name;
    }
}

class Athlete extends Person {
    constructor(name, sport) {
        super(name);
        this.sport = sport;
    }

    static train() {
        // some static functionality
    }
}
```

### Reduce

Essential `foldl` from Haskell. Not new to ES6.

```js
const sum = arr.reduce((prev, cur, index) =>
  prev + cur, 0);

//    [ 1, 2, 3 ]
// -> [ 0, 1, 2, 3 ]
// -> [ 0 + 1, 2, 3 ]
// -> [ 1 + 2, 3 ]
// -> [ 3 + 3 ]
// -> 6
```

### Modules

In NodeJS, packages are imported via `require()`. In ES6 we can attach them with `import`, and we can also make our own modules within the project.

```js
// Export.js
export default class Export {
    constructor(...
};
```
```js
// logic.js
export const important = 123;
export const myMethod = {} => {
    ...
};
```
```js
// app.js
import Export from './Export';
import { important, myMethod } from './logic';
...
```

## Asynchronous JavaScript

Async functions run in the background, in order to not block code.

When asyncronous events complete (such as DOM event listeners, HTTP requests and `setTimeout()`), they are put onto the *Message Queue*.

The *Event Loop* waits for the Execution Stack to be empty, and then moves functions onto it from the Message Queue.

### promises

Before promises, we used callbacks. Callbacks have to be nested and quickly become unmanageable.

A `Promise` is an object that tracks whether or not a certain event has happened. It allows us to define what happens once complete.

A waiting promise is 'pending', and once complete it is 'settled' or 'resolved'. A resolved promise can be 'fulfilled' or 'rejected'.

```js
const getX = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            ...
            success: resolve,
            error: ...
        }
    });
};
const getY = ...

getX()
.then(x => {
    //...
    return getY();
})
.then(y => {
    //...
})
.catch(error => {
    //...
})
```

### async await

An async function returns a promise.

```js
async function getXandY() {
    try {
        const x = await getX();
        //...

        const y = await getY();
        //...
    } catch(e) {
        //...
    }
}

getXandY().then( ... );
```

### ajax

Asynchronous Javascript And Xml

'Same Origin Policy' prevents any requests to external domains.

APIs must implement Cross Origin Resource Sharing CORS to avoid SOP. It can also be avoided by making the request on the server side.

```js
async function getGitHubDetails(username) {
    const result = await fetch
    (`https://api.github.com/users/${username}`);
 
    //...
}
```

## NodeJS

See notes within 9-forkify