
// Transforming input in required grid format
import { getData } from "../util.js";
const raw_input = getData("./input.txt").split(/\r?\n/);
const input = [];
for (const row of raw_input) {
    input.push(row.split(''));
}



const ROWS = input.length;
const COLS = input[0].length;
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]];
let result = 0;

while (true) {
    let loc = [];

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {

            if (input[r][c] != '@') {
                continue;
            }
            // process each cell at input[r][c]
            let adjacent_rolls_of_Paper = 0;

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && input[nr][nc] == '@') {
                    // process neighbor cell at input[nr][nc]
                    adjacent_rolls_of_Paper += 1;
                }
            }

            if (adjacent_rolls_of_Paper < 4) {
                result += 1;
                loc.push([r, c]);
            }
        }
    }
    if (loc.length == 0) {
        break;
    }

    for (const [r, c] of loc) {
        input[r][c] = 'X';
    }
    loc = [];
}

// console.log(input);

console.log("Result = ", result);

