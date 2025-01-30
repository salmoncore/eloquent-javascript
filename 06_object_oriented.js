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