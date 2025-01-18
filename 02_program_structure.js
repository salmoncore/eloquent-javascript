console.log("1. Looping a triangle\n");
// Write a loop with 7 calls to output a triangle to the console.

// So, make a for loop. 
// Each loop, append a hash to a string, and print the result. 
// Loop 7 times.

let hashString = "";

for (let i = 1; i < 8; i++) {
    hashString = hashString + "#";
    console.log(hashString);
}

console.log("\n2. FizzBuzz\n");
// Write a program to print all numbers 1 to 100.
// For all numbers divisible by 3, print "Fizz", and for all numbers divisible by 5 (and not 3), print Buzz.

// Using mod to determine what numbers are divisible by 3 or 5...

//for (let i = 1; i <= 100; i++) {
//    if (i % 3 == 0) {
//        console.log("Fizz");
//    } else if (i % 5 == 0) {
//        console.log("Buzz");
//    } else {
//        console.log(i);
//    }
//}

// Once this approach is working, modify the program to print "FizzBuzz" for numbers divisible by both 3 and 5.

// Write output to a buffer string - if empty, print the number instead.

for (let i = 1; i <= 100; i++) {
    let buffer = "";

    if (i % 3 == 0) {
        buffer += "Fizz";
    }
    if (i % 5 == 0) {
        buffer += "Buzz";
    }

    if (buffer != "") {
        console.log(buffer);
    } else {
        console.log(i);
    }
}

console.log("\n3. Chessboard\n");

// Write a program that creates a string that represents an 8x8 grid, using new-line characters to separate lines.
// At each position of the grid, there is either a space or a # character.

// Loop through the size, use mod to determine whether to start with a space or a hash.

//for (let i = 1; i <= 8; i++) {
//    if (i % 2 == 0) { // Print space first
//        let spaceString = "";
//        for (let j = 1; j <= 8; j++) {
//            if (j % 2 == 0) {
//                spaceString = spaceString + " "
//            } else {
//                spaceString = spaceString + "#"
//            }
//        }
//        console.log(spaceString)
//    } else { // Print hash first
//        let hashString = "";
//        for (let j = 1; j <= 8; j++) {
//            if (j % 2 == 0) {
//                hashString = hashString + "#"
//            } else {
//                hashString = hashString + " "
//            }
//        }
//        console.log(hashString)
//    }
//}

// Once this is working, define a binding size = 8, and change the program to work for any size.

// I'll just let the user determine the vertical/horizontal size for themselves?

const vSize = 2, hSize = 4; // To edit dimensions of the board.

for (let i = 1; i <= vSize; i++) { // Loop determines vertical dimension
    if (i % 2 == 0) { // Loop determines horizontal dimension
        let spaceString = "";
        for (let j = 1; j <= hSize; j++) {
            if (j % 2 == 0) {
                spaceString = spaceString + " "
            } else {
                spaceString = spaceString + "#"
            }
        }
        console.log(spaceString)
    } else { // Loop determines horizontal dimension
        let hashString = "";
        for (let j = 1; j <= hSize; j++) {
            if (j % 2 == 0) {
                hashString = hashString + "#"
            } else {
                hashString = hashString + " "
            }
        }
        console.log(hashString)
    }
}