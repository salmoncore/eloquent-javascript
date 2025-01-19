console.log("5.1: Flattening\n");

// Use the reduce method in combination with the concat method to "flatten"
// an array of arrays into a single array, with all elements included.

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((a, b) => a.concat(b)));
// → [1, 2, 3, 4, 5, 6]

console.log("\n5.2: Your own loop\n");

// Write a higher-order function - loop - that acts as a for-loop.

// takes a value, a test function, an update function, and a body function
// each iteration, run the test function on the loop value and stop if it is false
// if true, call the body function with the new value, call update for a new value
// finally, start over from the beginning
function loop(val, test, update, body) {
    if (test(val)) {
        body(val);
        loop(update(val), test, update, body);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

console.log("\n5.3: Everything\n");

// Write a method to return true when given an array and a ryle that is 
// followed by *every* value in that array, or false if one or more fail.

// Write using both a for-loop, and using the some method.

function every(array, test) {
    falseFlag = true;

    for (let i = 0; i < array.length; i++) {
        let value = array[i];
        if (test(value) == false) {
            falseFlag = false;
            break;
        }
    }

    return falseFlag;
}

// learned while writing this that you can't break out of for-in loops, lol

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

console.log("\n");

function everySome(array, test) {
    return !array.some(value => !test(value));
}

console.log(everySome([1, 3, 5], n => n < 10));
// → true
console.log(everySome([2, 4, 16], n => n < 10));
// → false
console.log(everySome([], n => n < 10));
// → true

console.log("\n5.4: Dominant writing direction\n");

// Write a function that computes the dominant writing direction in a string.
// Each script text has a direction property - ltr, rtl, or ttb.

// Count characters using characterScript, filter out the part of the result for script-less characters.

// Borrowing the SCRIPTS definitions from scripts.js included in the chapter files: https://eloquentjavascript.net/code/chapter/05_higher_order.zip
const SCRIPTS = [
    { name: "Latin", ranges: [[65, 91], [97, 123], [170, 171], [186, 187], [192, 215], [216, 247], [248, 697], [736, 741], [7424, 7462], [7468, 7517], [7522, 7526], [7531, 7544], [7545, 7615], [7680, 7936], [8305, 8306], [8319, 8320], [8336, 8349], [8490, 8492], [8498, 8499], [8526, 8527], [8544, 8585], [11360, 11392], [42786, 42888], [42891, 42927], [42928, 42936], [42999, 43008], [43824, 43867], [43868, 43877], [64256, 64263], [65313, 65339], [65345, 65371]], direction: "ltr" },
    { name: "Arabic", ranges: [[1536, 1541], [1542, 1548], [1549, 1563], [1564, 1565], [1566, 1567], [1568, 1600], [1601, 1611], [1622, 1648], [1649, 1757], [1758, 1792], [1872, 1920], [2208, 2229], [2230, 2238], [2260, 2274], [2275, 2304], [64336, 64450], [64467, 64830], [64848, 64912], [64914, 64968], [65008, 65022], [65136, 65141], [65142, 65277], [69216, 69247], [126464, 126468], [126469, 126496], [126497, 126499], [126500, 126501], [126503, 126504], [126505, 126515], [126516, 126520], [126521, 126522], [126523, 126524], [126530, 126531], [126535, 126536], [126537, 126538], [126539, 126540], [126541, 126544], [126545, 126547], [126548, 126549], [126551, 126552], [126553, 126554], [126555, 126556], [126557, 126558], [126559, 126560], [126561, 126563], [126564, 126565], [126567, 126571], [126572, 126579], [126580, 126584], [126585, 126589], [126590, 126591], [126592, 126602], [126603, 126620], [126625, 126628], [126629, 126634], [126635, 126652], [126704, 126706]], direction: "rtl" },
    { name: "Han", ranges: [[11904, 11930], [11931, 12020], [12032, 12246], [12293, 12294], [12295, 12296], [12321, 12330], [12344, 12348], [13312, 19894], [19968, 40939], [63744, 64110], [64112, 64218], [131072, 173783], [173824, 177973], [177984, 178206], [178208, 183970], [183984, 191457], [194560, 195102]], direction: "ltr" }
];

// Function from the book. https://eloquentjavascript.net/05_higher_order.html#h-gQf5HZNGpM
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

function dominantDirection(text) {
    // Track each character and its direction
    let counts = {};

    for (let char of text) { // For each character...
        const script = characterScript(char.codePointAt(0)); // get the script properties
        if (script) { // Make sure to only evaluate script-y characters
            counts[script.direction] = (counts[script.direction] || 0) + 1; // track
        }
    }

    // Find highest count
    let dominant;
    let count = 0;

    for (let direction in counts) {
        if (counts[direction] > count) {
            dominant = direction;
            count = counts[direction];
        }
    }

    return dominant;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl