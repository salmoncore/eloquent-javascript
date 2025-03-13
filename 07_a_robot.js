console.log("7.1: Measuring a Robot\n");

// I didn't get around to implementing the data from the book for the village state,
// for now, this can be pasted into https://eloquentjavascript.net/code/#7.1

function compareRobots(robot1, memory1, robot2, memory2) {
    // Make some arrays to store the move counts
    let r1Array = [];
    let r2Array = [];

    // Run the two robots on the same randomly generated village, repeat 100 times
    for (let i = 0; i < 100; i++) {
        let templateVillage = VillageState.random();
        let v1 = templateVillage;
        let v2 = templateVillage;

        r1Array.push(runRobot(v1, robot1, memory1));
        r2Array.push(runRobot(v2, robot2, memory2));
    }

    // Add arrays, divide by 100 to get the result
    // Goal oriented robot seems somewhat faster
    console.log(r1Array.reduce((a, b) => a + b) / 100);
    console.log(r2Array.reduce((a, b) => a + b) / 100);
}

// Adapted from the chapter content, just returns the robot's move count
function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

//compareRobots(routeRobot, [], goalOrientedRobot, []);

//console.log("\n7.2: Robot Efficiency\n");

// By collecting all packages and /then/ delivering, the
// overall robot efficiency is slightly increased.
// Regular averages on 100 runs are ~13.8 runs with oneTrackMindRobot, 
// versus ~14.8 runs with the goalOrientedRobot.

// To test, paste the following contents here: https://eloquentjavascript.net/code/#7.2

function compareRobots(robot1, memory1, robot2, memory2) {
    // Make some arrays to store the move counts
    let r1Array = [];
    let r2Array = [];

    // Run the two robots on the same randomly generated village, repeat 100 times
    for (let i = 0; i < 100; i++) {
        let templateVillage = VillageState.random();
        let v1 = templateVillage;
        let v2 = templateVillage;

        r1Array.push(runRobot(v1, robot1, memory1));
        r2Array.push(runRobot(v2, robot2, memory2));
    }

    // Add arrays, divide by 100 to get the result
    // Goal oriented robot seems somewhat faster
    console.log(r1Array.reduce((a, b) => a + b) / 100);
    console.log(r2Array.reduce((a, b) => a + b) / 100);
}

// Adapted from the chapter content, just returns the robot's move count
function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function oneTrackMindRobot({ place, parcels }, route) {
    if (route.length == 0) { // If no route, decide where to go
        // See if there are still parcels to collect
        let toCollect = parcels.filter(p => p.place != place);

        if (toCollect.length > 0) {
            // Get route to next uncollected parcel
            let parcel = toCollect[0];
            route = findRoute(roadGraph, place, parcel.place); // Get parcel
        } else {
            // All parcels are collected, deliver them one by one
            let parcel = parcels[0];
            route = findRoute(roadGraph, place, parcel.address); // Delivers
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

//compareRobots(oneTrackMindRobot, [], goalOrientedRobot, []);

// You can also just run the animation with this:

function oneTrackMindRobot({ place, parcels }, route) {
    if (route.length == 0) { // If no route, decide where to go
        // See if there are still parcels to collect
        let toCollect = parcels.filter(p => p.place != place);

        if (toCollect.length > 0) {
            // Get route to next uncollected parcel
            let parcel = toCollect[0];
            route = findRoute(roadGraph, place, parcel.place); // Get parcel
        } else {
            // All parcels are collected, deliver them one by one
            let parcel = parcels[0];
            route = findRoute(roadGraph, place, parcel.address); // Delivers
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

//runRobotAnimation(VillageState.random(), oneTrackMindRobot, []);

console.log("\n7.3: Persistent Group\n");

// Write a new class PGroup which stores a set of values and has operations for the data.
// It should have add, delete, and has methods.
// Adding should return a NEW PGroup instance with the new value added.
// Deletion should create a new instance as well, with the specified value removed.
// This class should work for any type, not just strings.
// The constructor shouldn't be a part of the class's interface.
// PGroup.empty should be used as a starting value.

class PGroup {
    constructor(arr) {
        this.arr = arr; // Instance property storing arr
    }

    has(val) {
        return this.arr.includes(val);
    }

    add(valToAdd) {
        if (this.arr.includes(valToAdd)) {
            return this;
        }
        return new PGroup([...this.arr, valToAdd]);
    }

    delete(valToRemove) {
        if (!this.arr.includes(valToRemove)) {
            return this;
        }
        return new PGroup(this.arr.filter((value) => value != valToRemove));
    }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false