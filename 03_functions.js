console.log("3.1: Minimum\n");

// Return the minimum out of two values.

function min(x, y) {
    return x < y ? x : y;
}

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

console.log("\n3.2: Recursion\n");

// Define a recursive function isEven that determines whether a value is even or odd.

function isEven (x) {
    x = Math.abs(x); // Necessary to handle negative numbers with this method.
    
    if (x == 0) {
        return true;
    } else if (x == 1) {
        return false;
    } else {
        return isEven(x - 2);
    }
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??

console.log("\n3.3 Bean Counting\n");

// Write a function called 'countBs' that takes a string as its argument, 
// and returns the count of uppercase 'b's in the string.

// Write a function called countChar that behaves like countBs, but lets you
// decide what the character to be counted is.

function countChar (s, c) {
    let count = 0;
    
    for (let i = 0; i < (s.length); i++) {
        if (s[i] == c) {
            count++;
        }
    }
    
    return count;
}

function countBs (s) {
    return countChar(s, 'B');
}

console.log(countChar("BeanString", 'n'));
console.log(countBs("BeanString"));

console.log(countBs("BOB"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4