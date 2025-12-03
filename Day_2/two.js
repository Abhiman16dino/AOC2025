import { getData } from "../util.js";

const input = getData("./input.txt").split(',');

function isInvalid(str) {
    const n = str.length;

    for (let len = 1; len <= n / 2; len++) {
        if (n % len !== 0) continue; // must divide evenly

        const part = str.slice(0, len);
        const repeatCount = n / len;

        if (repeatCount >= 2) {
            if (part.repeat(repeatCount) === str) {
                return true;
            }
        }
    }

    return false;
}

const invalid_id = [];

for (const range of input) {
    let [start, end] = range.split('-').map(Number);

    for (let i = start; i <= end; i++) {
        const str = i.toString();
        if (isInvalid(str)) {
            invalid_id.push(i);
        }
    }
}

let sum = invalid_id.reduce((a, b) => a + b, 0);
console.log(`Result = ${sum}`);
