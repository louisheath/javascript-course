// rest parameters

// allow an arbitrary number of function parameters

// each execution context has access to an arguments variable

//ES5
function isFullAge5(limit) {
  // start slice at 1 to ignore first limit param
  var args = Array.prototype.slice.call(arguments, 1);

  args.forEach(function(cur) {
    console.log((2018 - cur) >= limit);
  });
}

isFullAge5(18, 1990, 1998, 2015);

// ES6
function isFullAge6(limit, ...years) {
  years.forEach(cur => console.log((2018 - cur) >= limit));
}

isFullAge6(18, 1990, 1998, 2015);
