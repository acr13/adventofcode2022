import { readFileToGrid } from './helpers/read.js'

const grid = readFileToGrid('23.txt');

let E = new Set();

for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[r].length; c++) {
    if (grid[r][c] === '#') {
      E.add(`${r},${c}`);
    }
  }
}

let dirIndx = 0; // NORTH

const proposeMove = (rr, cc) => {
  const DELTAS = [ [-1, 0], [1, 0], [0, -1], [0, 1] ];
  const moves = [
    [[-1, -1,], [-1, 0], [-1, 1]], // N
    [[1, -1], [1, 0], [1, 1]], // S
    [[-1, -1], [0, -1], [1, -1]], // W
    [[-1, 1], [0, 1], [1, 1]], // E
  ];
  const adj = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  if (adj.every(([r, c]) => !E.has(`${rr + r},${cc + c}`))) {
    return [rr, cc];
  }

  let n = 0;
  let i = dirIndx;
  // check all 4, start with dirIndx

  while (n < 4) {
    const ms = moves[i].map(([r, c]) => `${r + rr},${c + cc}`);
    // console.log(ms);
    if (ms.every(m => !E.has(m))) {
      // console.log('I PROPOSE I GO', i);
      return [rr + DELTAS[i][0], cc + DELTAS[i][1]];
    }

    i = (i + 1) % 4;
    n++;
  }

  return [rr, cc];
};

let rounds = 0;
while (true) {
  const elves = [...E].map(e => e.split(',').map(Number));
  const hash = {};

  const proposed = elves.map(([rr, cc]) => {
    const pmove = proposeMove(rr, cc).join(',');

    if (hash[pmove]) { // dupe, don't store this
      hash[pmove] = undefined;
    } else {
      hash[pmove] = `${rr},${cc}`;
    }

    return [[rr, cc], pmove];
  });

  const newElves = proposed.map(([[rr, cc], pmove]) => {
    if (hash[pmove]) {
      return pmove;
    } else {
      return `${rr},${cc}`;
    }
  });

  if (newElves.every(e => E.has(e))) {
    console.log('Part two:', rounds + 1);
    break;
  }

  E = new Set(newElves);
  dirIndx = (dirIndx + 1) % 4;
  rounds++;

  if (rounds === 10) {
    const elves = newElves.map(e => e.split(',').map(Number));
    const ER = elves.map(e => e[0]);
    const EC = elves.map(e => e[1]);

    const minR = Math.min(...ER);
    const maxR = Math.max(...ER);
    const minC = Math.min(...EC);
    const maxC = Math.max(...EC);

    let score = 0;

    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        if (!E.has(`${r},${c}`)) {
          score++;
        }
      }
    }

    console.log('Part one:', score);
  }
}

