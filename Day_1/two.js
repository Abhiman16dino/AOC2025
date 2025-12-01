

// {
//     // Sample Input to Test
    // const raw_input = "L68 L30 R48 L5 R60 L55 L1 L99 R14 L82"
    // const input = raw_input.split(' ');
// }



import { getData } from "../util.js";
const input = getData("./input.txt").split(/\r?\n/);

const LEFT = 'L';
const RIGHT = 'R';

class LockNode {
    constructor(val, next = null, prev = null){
        this.val = val
        this.next = next
        this.prev = prev
    }
}

const arr = new Array(100);

// create the lock
for(let i = 0; i < 100; i++){
    arr[i] = new LockNode(i)
}

// prepare the lock next
for(let i = 0; i < 99; i++){
    arr[i].next = arr[i+1]
}

// re-attach the last node
arr[99].next = arr[0]

// prepare the lock prev
for(let i = 99; i > 0; i--){
    arr[i].prev = arr[i-1]
}

// re-attach the prev node
arr[0].prev = arr[99]


let pos = arr[50];

let res = 0;

for(const move of input){
    const dir = move[0];
    let count = Number(move.slice(1))
    if(dir == 'L'){
        while(count > 0){
            pos = pos.prev;
            if(pos.val == 0){
                ++res;
            }
            --count;
        }
    } else if (dir == 'R') {
        while(count > 0){
            pos = pos.next;
            if(pos.val == 0){
                ++res;
            }
            --count;
        }
    } else {
        console.log("You Bitch");
    }
    // if(pos.val == 0){
    //     ++res;
    // }
    console.log(`Dial is rotated in the Direction: ${dir} for ${count} times, currently dial is at ${pos.val}`);
}

console.log(`\n\nPassword is ${res}`);