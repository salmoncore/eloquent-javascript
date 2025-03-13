console.log("8. Bugs and Errors");

// I am overwhelmingly amused by the fact that javascript is 100% chill with calculating true * "monkey"
// Is true evaluated as 1 via type coercion, and "monkey" evaluated as... the string ASCII values in an array format?

console.log(true * "monkey");

// ... NaN
// Oh, that's what the chapter is about - love it

// I am now morbidly curious about all of the problems stemming from the `with` statement
// Also very good to know about "use strict" mode

//function test(label, body) {
//    if (!body()) console.log(`Failed: ${label}`);
//}
//
//test("convert Latin text to uppercase", () => {
//    return "hello".toUpperCase() == "HELLO";
//});

// Oh hey, testing stuff, that's my beat

// Left off [here](https://eloquentjavascript.net/08_error.html#:~:text=easy%20to%20test.-,Debugging,-Once%20you%20notice)