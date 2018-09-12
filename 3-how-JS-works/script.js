///////////////////////////////////////
// Lecture: Hoisting

/*

When a new execution context is made, i.e. a function is called
  an execution context object is created with the properties:
1. A Variable Object is created.
  - argument object containing function args is created
  - code is scanned for function and variable declarations
    - pointers to the functions and undefined variables are instantiated
      in the Variable Object.
    - this preprocessing is called Hoisting

2. Scope chain
  - handles variable access permissions
  - lexical scoping
    - which functions are related and so inherit scope?

3. setting THIS variable
  - attached to execution context
    - in global scope, 'this' is global object
      - in case of browser this is the window object
    - in method call, 'this' is the object that contains the method

*/

declaration();

function declaration() {
  console.log('this will always work, as hoisting will prepare a pointer');
}

//expression('this will not work, as expression is instantiated as undefined');

var expression = function(text) {
  console.log(text);
}

expression('this will work, because expression has been executed and its function declared');

console.log(age);

var age = 90;

function foo() {
  // this age is completely independent of the global age
    // but if it weren't redefined in foo() then it would be fetched from parent scope
  console.log(age);
  var age = 19;
  console.log(age);
}
foo();
console.log(age);

// execution stack and scope chain are different

var a = 'a';
first();
function first() {
  var b = 'b';
  second();
  function second () {
    var c = 'c';
    third();
  }
}
function third() {
  var d = 'd';
  console.log('I\'m above second in the execution stack but I can\'t see any of its variables');
}

// THIS
console.log(this);

var john = {
  name : 'John',
  foo : function() {
    console.log(this);
    console.log('That makes sense, as we\'re in a method');
    function bar() {
      console.log(this);
      console.log('This is messed up. Apparently this isn\'t in the method');
    }
    bar();
  }
};

john.foo();

var mike = {
  name : 'Mike',
  // method borrowing
  foo : john.foo
};

mike.foo();

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword
