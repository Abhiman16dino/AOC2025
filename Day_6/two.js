// ...existing code...
import { getData } from "../util.js";

const raw = getData("./input.txt").split(/\r?\n/);

// pad lines to same length
const maxLen = Math.max(...raw.map(l => l.length));
const lines = raw.map(l => l.padEnd(maxLen, " "));

const opLine = lines[lines.length - 1];
const dataRows = lines.slice(0, -1);

const isBlankCol = (ci) => {
    for (let r = 0; r < lines.length; r++) {
        if (lines[r][ci] !== " ") return false;
    }
    return true;
};

// find contiguous non-blank column blocks
const blocks = [];
let i = 0;
while (i < maxLen) {
    while (i < maxLen && isBlankCol(i)) i++;
    if (i >= maxLen) break;
    const start = i;
    while (i < maxLen && !isBlankCol(i)) i++;
    const end = i - 1;
    blocks.push({ start, end });
}

// process blocks right-to-left
let grandTotal = 0n;
for (let b = blocks.length - 1; b >= 0; b--) {
    const { start, end } = blocks[b];
    // find operator in this block (take rightmost operator found)
    let opChar = null;
    for (let ci = end; ci >= start; ci--) {
        const ch = opLine[ci];
        if (ch === "+" || ch === "*") { opChar = ch; break; }
    }
    if (!opChar) continue;

    // each column in the block is a number; read columns right-to-left
    const nums = [];
    for (let ci = end; ci >= start; ci--) {
        let digits = "";
        for (let r = 0; r < dataRows.length; r++) {
            const ch = dataRows[r][ci];
            if (ch !== " ") digits += ch;
        }
        if (digits === "") digits = "0";
        nums.push(BigInt(digits));
    }

    // compute result for this problem
    let res = opChar === "*" ? 1n : 0n;
    if (opChar === "*") {
        for (const n of nums) res *= n;
    } else {
        for (const n of nums) res += n;
    }

    grandTotal += res;
}

console.log("Grand total =", grandTotal.toString());
// ...existing code...