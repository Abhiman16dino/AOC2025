// const input = ["987654321111111", "811111111111119", "234234234234278", "818181911112111"]
const res = []

import { getData } from "../util.js";
const input = getData("./input.txt").split(/\r?\n/);


console.log(input);

for(const bank of input) {

    let max = -Infinity;

    for(let i = 0; i < bank.length-1; i++) {
        for(let j = i+1; j < bank.length; j++){
            const digit_string = `${bank[i]}${bank[j]}`
            const digit = Number(digit_string);
            if(max < digit){
                max = digit
            }
        }
    }

    res.push(max)
}

let sum = 0;

for(const jolt of res){
    sum += jolt
}

console.log(sum);