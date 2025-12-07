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

const ranges_to_search = [];

for(const r of range){
    const [low, high] = r.split('-').map(Number);
    ranges_to_search.push([low, high]);
}


for(const ingredent of ingredents){
    const num = Number(ingredent);
    for(const [low, high] of ranges_to_search){
        if(num >= low && num <= high){
            ++res;
            break;
        }
    }
}

console.log(res);