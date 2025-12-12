import { getData } from "../util.js";

const raw = getData("./input.txt").trim().split('\n');
const grid = raw.map(line => line.split(''));
const rows = grid.length;
const cols = grid[0]?.length || 0;

let startRow = -1, startCol = -1;
for (let r = 0; r < rows; r++) {
  const c = grid[r].indexOf('S');
  if (c !== -1) { startRow = r; startCol = c; break; }
}
if (startRow === -1) {
  console.error("Start 'S' not found");
  process.exit(1);
}

let active = new Set([startCol]); // columns with beams at current row
let splits = 0;

for (let r = startRow + 1; r < rows; r++) {
  const nextActive = new Set();
  const queue = [];
  const seenQueue = new Set();

  // Process beams coming from previous row into row r
  for (const col of active) {
    if (col < 0 || col >= cols) continue;
    const ch = grid[r][col];
    if (ch === '^') {
      // splitter encountered: stop beam and produce new beams left/right at same row
      if (!seenQueue.has(col)) {
        splits++;
        if (col - 1 >= 0) queue.push(col - 1);
        if (col + 1 < cols) queue.push(col + 1);
        seenQueue.add(col);
      }
    } else {
      // beam continues downward
      nextActive.add(col);
    }
  }

  // Process any newly produced beams at the same row (they may immediately hit splitters)
  const processedSameRow = new Set();
  while (queue.length) {
    const c = queue.shift();
    if (c < 0 || c >= cols) continue;
    if (processedSameRow.has(c)) continue;
    processedSameRow.add(c);
    const ch = grid[r][c];
    if (ch === '^') {
      splits++;
      if (c - 1 >= 0) queue.push(c - 1);
      if (c + 1 < cols) queue.push(c + 1);
    } else {
      nextActive.add(c);
    }
  }

  active = nextActive;
  if (active.size === 0) break; // no beams left
}

console.log(splits);