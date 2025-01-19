console.log("4.1: The sum of a range\n");

// Write a range function that takes two arguments: start and end
// Range should return an array containing all of the numbers from start until end.
// Add a step feature, which allows you to choose what value is used to iterate.
// Then, write a sum function that takes an array of numbers and returns its sum.

function range(start, end, step) {
    let stack = [];

    if (step == undefined) { step = 1; }

    if (start < end) {
        for (i = start; i <= end; i += step) {
            stack.push(i);
        }
    } else {
        for (i = start; i >= end; i += step) {
            stack.push(i);
        }
    }

    return stack;
}

function sum(arr) {
    let result = 0;

    for (let indexVal of arr) {
        result += indexVal;
    }

    return result;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

console.log("\n4.2: Reversing an array\n");

// Write two functions:
// reverseArray - takes an array, produces a *new* array with the elements in reverse
// reverseArrayInPlace - modifies an existing array, reversing its order

function reverseArray(arr) {
    let newArr = [];
    let i;

    for (i = arr.length - 1; i >= 0; i--) { // index starts at 0
        newArr.push(arr[i]);
    }

    return newArr;
}

function reverseArrayInPlace(arr) {
    let buffer, i, j;

    // iterate on the head and tail elements, until you hit the middle
    for (i = 0, j = arr.length - 1; i <= j; i++, j--) {
        buffer = arr[i]; // put the head to the side
        arr[i] = arr[j]; // store the tail in the head
        arr[j] = buffer; // put the value of the head as the tail
    }

    return arr;
}

let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"];
console.log(myArray);
// → ["A", "B", "C"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

console.log("\n4.3: A list\n");

// Write a function arrayToList that builds up a list structure.
// Start with the helper function prepend, which takes an element and a list
// and adds the element to the front of the input list.
// Additionally, add the recursive function nth, which takes a list 
// and a number, returning the element at the given position in the list
// (0 refers to the first element) or undefined when there's no element.

function prepend(element, list) {
    let newList = {
        value: element,
        rest: list
    };

    return newList;
}

function arrayToList(arr) {
    let list = { value: arr[arr.length - 1], rest: null };

    for (let i = arr.length - 2; i >= 0; i--) {
        list = prepend(arr[i], list);
    }

    return list;
}

function nth(list, index) {
    if (index == 0) {
        return list.value;
    } else {
        return nth(list.rest, index - 1);
    }
}

function tailFinder(list, index) {
    if (index == 0) {
        return list;
    } else {
        return tailFinder(list.rest, index - 1);
    }
}

function listToArray(list) {
    let array = [];

    for (let i = 0; tailFinder(list, i) != null; i++) {
        array.push(nth(list, i));
    }

    return array;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

/*
This is a very silly approach, as I was having some trouble finding a more
elegant solution to finding where the tail of the list was quickly. 
I ended up repurposing the logic for `nth`, but ideally this functionality 
would either be lumped in to that method, or the length would be stored as 
a property of the list. 

Looking at the solution - `(let node = list; node; node = node.rest)` 
is actually so clever. If the node is null, then it returns false I assume?
Crazy.
*/

console.log("\n 4.4: Deep comparision\n");

// Write a function deepEqual that takes two values, and returns true only if
// they are the same value, or are object with the same properties.
// Values of properties are considered equal when compared with a recursive
// call to deepEqual.

// Note that this was based partially off the solution, specifically for how keys worked.

function deepEqual(x, y) {
    if (x === y) {
        return true;
    } else if (x == null || y == null || 
        typeof x != "object" || typeof y != "object" || 
        Object.keys(x).length != Object.keys(y).length) {
        return false;
    }

    for (let key of Object.keys(x)) {
        if (!Object.keys(y).includes(key) || !deepEqual(x[key], y[key])) {
            return false;
        }
    }

    return true;
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true