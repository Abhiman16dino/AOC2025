
import { getData } from "../util.js";
let raw_input = getData("./input.txt").split(/\r?\n/);

const input = raw_input.map(line => line.split(' ').filter(s => s !== ''));

console.log(input);

const op = input.pop();

const result = [];

const rows = input.length;
const cols = input[0]?.length ?? 0;

for (let i = 0; i < cols; i++) {
    let col;
    if (op[i] === '*') {
        col = 1;
        for (let j = 0; j < rows; j++) {
            col *= Number(input[j][i]);
        }
    } else {
        col = 0;
        for (let j = 0; j < rows; j++) {
            col += Number(input[j][i]);
        }
    }
    result.push(col);
}

let sum = 0;
for (const val of result) {
    sum += val;
}

console.log("Result = ", sum);
