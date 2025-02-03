// Note that this chapter is really titled "The Secret Life of Objects", 
// but the takeaway I got was that JavaScript really supports a lot of OOP-style
// programming practices, and that objects have some other cool features

console.log("6.1: A vector type\n");

// Write a class "Vec" that represents a vector in a two-dimensional space.
// It takes x and y parameters (numbers), saved to properties of the same name.

// Add "plus" and "minus" methods, which take another vector and returns a new
// vector of the sum or difference of the old and new vectors.

// Add a getter property for "length", determined from the point and the length
// from an origin at (0, 0).

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(v2) {
        return new Vec(this.x + v2.x, this.y + v2.y);
    }

    minus(v2) {
        return new Vec(this.x - v2.x, this.y - v2.y);
    }

    get length() {
        // sqrt(x^2 + y^2)
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

console.log("\n6.2: Groups\n");

// Write a class called "Group" that acts like a set.
// It has add, delete, and has methods. Its
// constructor creates an empty group, add adds
// a value to the group if it doesn't exist, and has
// returns a bool value indicating whether it exists.

// Compare values with ===.
// Give the class a static from method that takes an
// iterable object as its argument and creates a group 
// that contains all the values produced by iterating
// over it.

class Group {
    constructor(group) {
        this.group = group;
    }

    static from(array) {
        let buffer = [];

        for (let i = 0; i < array.length; i++) {
            if (!buffer.includes(array[i])) {
                buffer.push(array[i]);
            }
        }

        return new Group(buffer);
    }

    [Symbol.iterator]() {
        let group = this.group;
        let index = 0;

        return{
            next() {
                if (index >= group.length) {
                    return {done: true};
                } else {
                    return {value: group[index++], done: false};
                }
            }
        };
    }

    has(val) {
        if (this.group.includes(val)) return true;
        return false;
    }

    add(val) {
        if (!this.group.includes(val)) this.group.push(val);
    }

    delete(val) {
        for (let i = 0; i < this.group.length; i++) {
            if (this.group[i] === val) {
                this.group.splice(i, 1);
            }
        }
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

console.log("\n6.3: Iterable Groups\n");

// Make the "Group" class from the previous exercise iterable.

// I couldn't get the book example to work, so I adapted a
// solution from Stack Overflow:
// https://stackoverflow.com/questions/48132121/how-to-make-iterable-object-in-javascript

// Seeing the solution wasn't a huge help either?

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// → a
// → b
// → c