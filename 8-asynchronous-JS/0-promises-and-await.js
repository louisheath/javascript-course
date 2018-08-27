// ASYNC

/*
we allow asyncronous functions to run in the background
we pass in callbacks that run once work is complete
we then move on - we don't block code

setTimeout is an example of JS async
*/

// THE EVENT LOOP

/*

functions such as setTimeout, DOM event listeners and http requests
  are all processed asyncronously in the 'Web APIs'.

When they are ready to execute, their callbacks are placed in the 'Message Queue'.

The 'Event Loop' monitors the Execution Stack and waits for it to be empty,
 it then shifts a function from the Message Queue to the Execution Stack

*/

// CALLBACK HELL

/*

This is when we have layers upon layers of nested callbacks.
Code becomes increasingly unmanageable

*/

// PROMISES

/*

A promise is an object that tracks whether or not a certain event has happened.
It determines what happens after the event has happened.
It implements the concept of a future value that we are expecting

Before the event happens, a promise is 'pending'.
After, it is 'settled' or 'resolved'.
  A resolved promise can be 'fulfilled' or 'rejected'

*/

// promises take an 'executor' function
//  the executor function takes two params which determine the later execution
//  we define them as then() and catch()
const getIDs = () => {
  return new Promise((resolve, reject) => {
    // this timeout is simulating an AJAX get request
    setTimeout(() => {
      resolve([523, 883, 432, 974]);
    }, 1500);
  })
};

// this function returns a promise
//  we will use this to chain together the callbacks, rather than nesting them
const getRecipe = recID => {
  return new Promise((resolve, reject) => {
    // a second AJAX call
    setTimeout(ID => {
      const recipe = {
        title: 'Fresh tomato pasta',
        publisher: 'Jonas'
      };
      resolve(`${ID}: ${recipe.title}`);
    }, 1500, recID)
  });
};

const getRelated = publisher => {
  return new Promise((resolve, reject) => {
    setTimeout(pub => {
      const recipe = {
        title: 'Fresh tomato pasta',
        publisher: 'Jonas'
      };
      resolve(`${pub}: ${recipe.title}`);
    }, 1500, publisher);
  })
};

// so we have two (useless) AJAXs
//  1. first gets a list of recipe IDs
//  2. second gets the recipe title for a given recipe ID
//  3. third gets the pubisher name
// we want to do one after another without nesting

function thenCatchDemo() {

  getIDs()
  .then(IDs => { // IDs is the array that is passed into resolve()
    console.log(IDs);
    return getRecipe(IDs[2]);
  }) // this returns a promise, so we can use 'then' again
  .then(recipe => {
    console.log(recipe);
    return getRelated('Jonas');
  })
  .then(recipe => {
    console.log(recipe);
  })
  .catch(error => { // we never call reject so this shouldn't happen
    console.log('Error!');
  });

}

/*
then/catch works a lot like try/catch i.e

try {
  then1()
  then2()
  then3()
} catch {
  // handle various errors
}

*/

// an alternative to then() and catch() is async/await

function AWDemo() {

  const promise = getIDs();

  async function getRecipesAW() {
    const IDs = await promise; // this waits for getIDs to be resolved
    console.log(IDs);         // the resolution/error is saved in IDs

    const recipe = await getRecipe(IDs[ 2 ]);
    console.log(recipe);

    const related = await getRelated('Jonas');
    console.log(related);

    // return recipe; // we could pass the recipe into the then() function
  }
  getRecipesAW().then(() => console.log(`Got recipe!`)); // async functions return promises

}
