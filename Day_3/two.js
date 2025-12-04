function largest12Digits(numStr) {
    let remove = numStr.length - 12;   // remove exactly 3
    const stack = [];

    for (const ch of numStr) {
        while (remove > 0 && stack.length && stack.at(-1) < ch) {
            stack.pop();
            remove--;
        }
        stack.push(ch);
    }

    // If any removals left, remove from end
    return stack.slice(0, 12).join('');
}

import { getData } from "../util.js";
const input = getData("./input.txt").split(/\r?\n/);

// const input = [
//     "987654321111111",
//     "811111111111119",
//     "234234234234278",
//     "818181911112111"
// ];

let total = 0n;

for (const s of input) {
    const best = largest12Digits(s);
    console.log(best);
    total += BigInt(best);
}

console.log("Total:", total.toString());
