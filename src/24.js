import { readFileToGrid  } from './helpers/read.js';

const grid = readFileToGrid('24.txt');
const R = grid.length;
const C = grid[0].length;

const computeBadCells = (grid) => {
  const BAD_CELLS = {};
  for (let i = 0; i < (R-2) * (C-2) + 1; i++) {
    // console.log(i);
    const BAD = new Set();

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++){
        if (grid[r][c] === '>') {
          const d = 1 + ((c - 1 + i) % (C - 2))
          BAD.add(`${r},${d}`);
        } else if (grid[r][c] === 'v') {
          const d = (1 + ((r - 1 + i) % (R - 2)));
          BAD.add(`${d},${c}`);
        } else if (grid[r][c] === '<') {
          const d = 1 + ((c - 1 - i) % (C - 2));
                // d = 1+ ((cc-1-t)%(C-2))
          // console.log(i, d);
          // why is this different in js vs python
          BAD.add(`${r},${d}`);
        } else if (grid[r][c] === '^') {
          BAD.add(`${(1 + ((r - 1 - i) % (R - 2)))},${c}`);
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

const p1 = (grid) => {
  const BAD_CELLS = computeBadCells(grid);
  const SEEN = new Set();

  const Q = [ [0, getStartCol(grid), 0] ];
  while (Q.length > 0) {
    const [r, c, t] = Q.shift();

    // console.log(r,c,t);
    
    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] === '#') {
      continue;
    }

    if (r === R - 1) {
      // console.log('row is', r);
      // console.log(r,c,t);
      return t;
    }

    if (SEEN.has(`${r},${c},${t}`)) {
      continue;
    }
    SEEN.add(`${r},${c},${t}`);
    const BAD = BAD_CELLS[t+1]
    // console.log('good move', r,c,t);
    if (t === 15) {
      // console.log(BAD);
    }

    if (!BAD.has(`${r},${c}`)) {
      Q.push([r,c,t+1]);
    }
    if (!BAD.has(`${r+1},${c}`)) {
      Q.push([r+1,c,t+1]);
    }
    if (!BAD.has(`${r-1},${c}`)) {
      Q.push([r-1,c,t+1]);
    }
    if (!BAD.has(`${r},${c+1}`)) {
      // console.log('lets move right', r, c+1, t+1);
      Q.push([r,c+1,t+1]);
    }
    if (!BAD.has(`${r},${c-1}`)) {
      Q.push([r,c-1,t+1]);
    }
  }

};

console.log('Part one:', p1(grid));