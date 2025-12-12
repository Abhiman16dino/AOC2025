import { getData } from "../util.js";

const raw = getData("./input.txt").trim().split('\n');
const grid = raw.map(l => l.split(''));
const rows = grid.length;
const cols = grid[0]?.length || 0;

let startR = -1, startC = -1;
for (let r = 0; r < rows; r++) {
  const c = grid[r].indexOf('S');
  if (c !== -1) { startR = r; startC = c; break; }
}
if (startR === -1) {
  console.error("Start 'S' not found");
  process.exit(1);
}

// counts of particles entering the current row: Map<col, BigInt>
let curr = new Map();
curr.set(startC, 1n);

let exited = 0n;

// process rows starting at the row just below S
for (let r = startR + 1; r < rows; r++) {
  // process same-row splitting fully using a queue (map)
  const queue = new Map(curr); // copy
  const next = new Map(); // counts that will go down to next row

  while (queue.size) {
    // take one entry
    const it = queue.entries().next();
    const col = it.value[0];
    const cnt = it.value[1];
    queue.delete(col);

    if (col < 0 || col >= cols) {
      // particle already left the manifold sideways
      exited += cnt;
      continue;
    }

    const ch = grid[r][col];
    if (ch === '^') {
      // splitter: particle stops and produces left/right at same row
      const l = col - 1, rr = col + 1;
      queue.set(l, (queue.get(l) || 0n) + cnt);
      queue.set(rr, (queue.get(rr) || 0n) + cnt);
    } else {
      // particle continues downward
      if (r === rows - 1) {
        // moving off the bottom -> exit
        exited += cnt;
      } else {
        next.set(col, (next.get(col) || 0n) + cnt);
      }
    }
  }

  curr = next;
  if (curr.size === 0) break;
}

// any remaining particles (if S was on last row or similar) exit
for (const cnt of curr.values()) exited += cnt;

console.log(exited.toString());