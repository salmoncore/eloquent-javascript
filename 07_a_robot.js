console.log("7.1: Measuring a Robot\n");

// Still need to import the rest of the functionality for running robots from the site,
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

compareRobots(routeRobot, [], goalOrientedRobot, []);