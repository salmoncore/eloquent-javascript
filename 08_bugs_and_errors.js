console.log("8. Bugs and Errors");

// I am overwhelmingly amused by the fact that javascript is 100% chill with calculating true * "monkey"
// Is true evaluated as 1 via type coercion, and "monkey" evaluated as... the string ASCII values in an array format?

//console.log(true * "monkey");

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

// Good to know that this book advocates for putting console.out lines everywhere for debugging purposes, too
// Oh wow, it's also good to know that browsers support breakpoints for javascript - `debugger` triggers the break

// Try catch looks like java as well
// try {
//     console.log("This worked!");
// } catch (error) {
//     console.log("Something went wrong: " + error);
// } finally {
//     console.log("Bye!");
// }

// Good to know that you can specify error types, nesting try-catches with decreasing specificity is possible
// class InputError extends Error { }
// 
// function promptDirection(question) {
//     let result = prompt(question);
//     if (result.toLowerCase() == "left") return "L";
//     if (result.toLowerCase() == "right") return "R";
//     throw new InputError("Invalid direction: " + result);
// }

// Assertion syntax looks like `throw new Error("explanation")`

console.log("\n8.1: Retry\n");

// Looks relevant
// catch (e) {
//     if (e instanceof InputError) {

class MultiplicatorUnitFailure extends Error { }

// error type MultiplicatorUnitFailure
function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    // catch e instanceof MultiplicatorUnitFailure

    try {
        return primitiveMultiply(a, b);
    } catch (e) {
        if (e instanceof MultiplicatorUnitFailure) {
            return reliableMultiply(a, b);
        }
    }
}

console.log(reliableMultiply(8, 8));
// → 64

console.log("\n8.2: The Locked Box\n");

const box = new class {
    locked = true;
    #content = [];

    unlock() { this.locked = false; }
    lock() { this.locked = true; }
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this.#content;
    }
};

function withBoxUnlocked(body) {
    // unlock the box
    // run body 
    // lock the box again via finally
    // if body returns error, catch

    lockFlag = false;

    if (box.locked == true) {
        box.unlock();
        lockFlag = true;
    }
    
    try {
        body();
    } catch (e) {
        console.log(e);
    } finally {
        if (lockFlag) {
            box.lock();
        }
    }
}

withBoxUnlocked(() => {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(() => {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised: " + e);
}
console.log(box.locked);
// → true