'use strict';

import { readFileToGrid  } from './helpers/read.js';

const grid = readFileToGrid('24.txt');
const R = grid.length;
const C = grid[0].length;

// TIL - Javascript Modulo doesn't work for negative numbers. wow.
// JS  -1 % 6 = -1
// Life -1 % 6 = 5
const mod = (n, m) => ((n % m) + m) % m;

const computeBadCells = (grid) => {
  const BAD_CELLS = {};
  for (let i = 0; i < (R-2) * (C-2) + 1; i++) {
    const BAD = new Set();

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++){
        if (grid[r][c] === '>') {
          const d = 1 + (mod((c - 1 + i), C - 2));
          BAD.add(`${r},${d}`);
        } else if (grid[r][c] === 'v') {
          const d = 1 + (mod((r - 1 + i), R - 2));
          BAD.add(`${d},${c}`);
        } else if (grid[r][c] === '<') {
          const d = 1 + (mod((c - 1 - i), C - 2));
          BAD.add(`${r},${d}`);
        } else if (grid[r][c] === '^') {
          const d = 1 + (mod((r - 1 - i), R - 2));
          BAD.add(`${d},${c}`);
        }
      }
    }
    BAD_CELLS[i] = BAD;
  }

  return BAD_CELLS;
};

const getStartCol = (grid) => {
  for (let c = 0; c < grid[0].length; c++) {
    if (grid[0][c] === '.') {
      return c;
    }
  }
}

const solve = (grid) => {
  let p1 = false;
  const BAD_CELLS = computeBadCells(grid);
  const SEEN = new Set();

  const Q = [ [0, getStartCol(grid), 0, false, false] ];
  while (Q.length > 0) {
    let [r, c, t, reachedEnd, backToStart] = Q.shift();
    
    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] === '#') {
      continue;
    }
    if (r === R - 1 && reachedEnd && backToStart) {
      console.log('Part two:', t);
      return;
    }
    if (r === R - 1 && !p1) {
      console.log('Part one:', t);
      p1 = true;
    }
    if (r === R - 1) {
      reachedEnd = true;
    }
    if (r === 0 && reachedEnd) {
      backToStart = true;
    }

    if (SEEN.has(`${r},${c},${t}`)) {
      continue;
    }
    SEEN.add(`${r},${c},${t}`);
    const BAD = BAD_CELLS[t+1]

    if (!BAD.has(`${r},${c}`)) {
      Q.push([r,c,t+1,reachedEnd,backToStart]);
    }
    if (!BAD.has(`${r+1},${c}`)) {
      Q.push([r+1,c,t+1,reachedEnd,backToStart]);
    }
    if (!BAD.has(`${r-1},${c}`)) {
      Q.push([r-1,c,t+1,reachedEnd,backToStart]);
    }
    if (!BAD.has(`${r},${c+1}`)) {
      // console.log('lets move right', r, c+1, t+1);
      Q.push([r,c+1,t+1,reachedEnd,backToStart]);
    }
    if (!BAD.has(`${r},${c-1}`)) {
      Q.push([r,c-1,t+1,reachedEnd,backToStart]);
    }
  }
};

solve(grid);
