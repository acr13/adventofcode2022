import { readFileToGridIntegers } from './helpers/read.js'

const grid = readFileToGridIntegers('8.txt');

const DELTAS = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];

const isVisibleDirection = (grid, r, c, delta) => {
  let rr = r + delta[0];
  let cc = c + delta[1];

  while (rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[0].length) {
    if (grid[rr][cc] >= grid[r][c]) {
      return false;
    }

    rr += delta[0];
    cc += delta[1];
  }

  return true;
};

const isVisible = (grid, r, c) =>
  DELTAS.some(delta => isVisibleDirection(grid, r, c, delta));

const p1 = (grid) => {
  let n = grid[0].length * 2 + ((grid[0].length - 2) * 2);

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (isVisible(grid, i, j)) {
        n++;
      }
    }
  }

  return n;
};

const scenicScore = (grid, r, c) => 
  DELTAS.map(delta => {
    let n = 0;
    let rr = r + delta[0];
    let cc = c + delta[1];

    while (rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[0].length) {
      n++;
      if (grid[rr][cc] >= grid[r][c]) {
        return n;
      }

      rr += delta[0];
      cc += delta[1];
    }

    return n;
  }).reduce((product, val) => product * val, 1);

const p2 = (grid) => {
  let max = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      const score = scenicScore(grid, i, j);
      if (score > max) {
        max = score;
      }
    }
  }

  return max;
};

console.log('Part one:', p1(grid));
console.log('Part two:', p2(grid));
