import { readFile } from './helpers/read.js';

const DIRS = ['U', 'R', 'D', 'L']
const DELTAS = [ [-1, 0], [0, 1], [1, 0], [0, -1] ];
const DIR_SCORE = [3, 0, 1, 2];

const input = readFile('22.txt');
const grid = [];
const instructions = [];

let curr = [0,-1];
let dirIndex = 1; // R
let instructionsStr;

for (let i = 0; i < input.length; i++) {
  if (input[i] === '') {
    instructionsStr = input[i + 1];
    break;
  }
  grid.push(input[i].split(''));
}

const findFirstPosInRow = (grid, row) => {
  for (let c = 0; c < grid[row].length; c++) {
    if (grid[row][c] === '.' || grid[row][c] === '#') {
      return c;
    }
  }
}

const findLastPosInRow = (grid, row) => {
  for (let c = grid[row].length - 1; c >= 0; c--) {
    if (grid[row][c] === '.' || grid[row][c] === '#') {
      return c;
    }
  }
};

const findFirstPosInCol = (grid, col) => {
  for (let r = 0; r < grid.length; r++) {
    if (grid[r][col] === '.' || grid[r][col] === '#') {
      return r;
    }
  }
};

const findLastPosInCol = (grid, col) => {
  for (let r = grid.length - 1; r >= 0; r--) {
    if (grid[r][col] === '.' || grid[r][col] === '#') {
      return r;
    }
  } 
};

curr[1] = findFirstPosInRow(grid, 0);

let i = 0;
let s = '';
while (i < instructionsStr.length) {
  if (instructionsStr.charAt(i) === 'L' || instructionsStr.charAt(i) === 'R') {
    instructions.push(parseInt(s));
    instructions.push(instructionsStr.charAt(i));
    s = '';
  } else {
    s += instructionsStr.charAt(i);
  }
  i++;
}

const move = (N, curr) => {
  let n = 0;

  while (n < N) {
    let next = [curr[0] + DELTAS[dirIndex][0], curr[1] + DELTAS[dirIndex][1]];

    console.log(next);

    if (dirIndex === 1 || dirIndex === 3) {
      // wrap horizontally?
      // is the next position out of bounds OR is the next position an empty string (to the left)
      if ((next[1] >= grid[next[0]].length || next[1] < 0) || (grid[next[0]][next[1]] === ' ')) {
        if (dirIndex === 1) { // R
          next = [next[0], findFirstPosInRow(grid, next[0])];
        } else if (dirIndex === 3) {
          next = [next[0], findLastPosInRow(grid, next[0])];
        }
      }
    }

    if (dirIndex === 0 || dirIndex === 2) {
      // wrap vertical
      // is this cell an empty string or OOB
      if ((next[0] < 0 || next[0] >= grid.length) || (grid[next[0]][next[1]] === ' ')) {
        if (dirIndex === 0) { // U
          next = [findLastPosInCol(grid, next[1]), next[1]];
        } else if (dirIndex === 2) { // D
          next = [findFirstPosInCol(grid, next[1]), next[1]];
        }
      }
    }

    // base case, hit a wall
    if (grid[next[0]][next[1]] === '#') {
      break;
    }

    curr = next;
    n++;
  }


  return curr;
};

for (let i = 0; i < instructions.length; i++) {
  const instr = instructions[i];

  if (instr === 'L') {
    dirIndex = (dirIndex === 0) ? DIRS.length - 1 : dirIndex - 1;
  } else if (instr === 'R') {
    dirIndex = (dirIndex + 1) % DIRS.length;
  } else {
    curr = move(instr, curr);
  }

  // console.log(curr, DIRS[dirIndex]);
}

const score = (1000 * (curr[0] + 1)) + (4 * (curr[1] + 1)) + DIR_SCORE[dirIndex];
console.log('Part one:', score);

