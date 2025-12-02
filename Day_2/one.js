// const sample_input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224, 1698522-1698528,446443-446449,38593856-38593862,565653-565659, 824824821-824824827,2121212118-2121212124";

// const input = sample_input.split(',');



import { getData } from "../util.js";
const input = getData("./input.txt").split(',');


// Reconfirm the input is processed correctly
console.log(input);

const invalid_id = [];

for(const range of input){
    let [start, end] = range.split('-')
    start = Number(start)
    end = Number(end)
    // console.log(`Start = ${start}, End = ${end}`);
    for(let i = start; i <= end; i++){
        const str = i.toString();
        // console.log(value);
        const len = str.length;
        if(len % 2 == 0){
            const midPoint = Math.ceil(str.length / 2);
            const firstHalf = str.slice(0, midPoint);
            const secondHalf = str.slice(midPoint);
            if(firstHalf == secondHalf){
                invalid_id.push(i)
            }
        }
    }
    // console.log("-----------");
}

let sum = 0;

for(const id of invalid_id){
    sum += id;
}

console.log(`Result = ${sum}`);