// due to let and const, we don't need IIFEs to achieve data privacy!

function testEncapsulation5() {
  (function() {
    var a = 1;
    var b = 2;
    console.log(a + b);
  })();
  console.log(a + b);
}

function testEncapsulation6() {
  {
    const a = 1;
    let b = 2;
    console.log(a + b);

    var c = 1;
  }
  console.log(c); // works, as var is function scoped

  console.log(a + b); // error, as a and b are in a higher block
}
