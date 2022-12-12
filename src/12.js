import { readFileToGrid } from './helpers/read.js';

const grid = readFileToGrid('12.txt');

let START = [0, 0];
let END = [0, 0];

for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (grid[r][c] === 'S') {
      START = [r, c];
      grid[r][c] = 'a';
    } else if (grid[r][c] === 'E') {
      END = [r, c];
      grid[r][c] = 'z';
    }
  }
}

const validMoves = (grid, r, c) =>
  [
    [r - 1, c],
    [r + 1, c],
    [r, c + 1],
    [r, c - 1]
  ]
    .filter(([rr, cc]) => rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[r].length)
    .filter(([rr, cc]) => grid[rr][cc].charCodeAt(0) - grid[r][c].charCodeAt(0) <= 1);

const BFS = (grid, start, end) => {
  const queue = [ [[...start], 0] ];
  const visited = new Set();
  visited.add(`${start[0]},${start[1]}`);
  
  while (queue.length > 0) {
    const [pos, n] = queue.shift();

    if (pos[0] === end[0] && pos[1] === end[1]) {
      return n;
    }

    validMoves(grid, pos[0], pos[1])
      .filter(move => !visited.has(`${move[0]},${move[1]}`))
      .forEach(move => {
        visited.add(`${move[0]},${move[1]}`);
        queue.push([move, n + 1]);
    });
  }
};

const p1 = (grid) => BFS(grid, START, END);

const p2 = (grid) => {
  const starts = [];

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 'a') {
        starts.push([r, c]);
      }
    }
  }

  const stepsForEachStart = starts.map(start => BFS(grid, start, END))
    .filter(steps => !!steps);
  return Math.min(...stepsForEachStart);
};

console.log('Part one:', p1(grid));
console.log('Part two:', p2(grid));
