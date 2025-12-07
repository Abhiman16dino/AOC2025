// Splitting input into two parts based on empty line
import { getData } from "../util.js";
const input = getData("./input.txt").split(/\r?\n/);
const emptyIndex = input.indexOf('');
const range = input.slice(0, emptyIndex);
const ingredents = input.slice(emptyIndex + 1);
// console.log(range);
// console.log(ingredents);


const fresh = {};
let res = 0;

const aRange = [];

for(const r of range){
    const [low, high] = r.split('-').map(Number);
    aRange.push([low, high]);
}

aRange.sort((a, b) => a[0] - b[0]);

for(let i = 0; i < aRange.length - 1; i++){
    const [currentLow, currentHigh] = aRange[i];
    const [nextLow, nextHigh] = aRange[i + 1];

    if(currentHigh >= nextLow){
        aRange[i + 1][0] = currentLow;
        aRange[i + 1][1] = Math.max(currentHigh, nextHigh);
        aRange[i][0] = -1;
        aRange[i][1] = -1;
    }
}

for(const [low, high] of aRange){
    if(low == -1 && high == -1){
        continue;
    }
    res += (high - low + 1);
}

// WE NEED TO MERGE INTERVALS

console.log(res);