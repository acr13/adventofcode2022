import { readFile } from './helpers/read.js';

const input = readFile('17.txt');

const getNextRock = (t, y) => {
  if (t === 0) {
    return [ [2,y], [3,y], [4,y], [5,y] ];
  } else if (t === 1) {
    return [ [3,y+2], [2,y+1], [3,y+1], [4,y+1], [3,y] ];
  } else if (t === 2) {
    return [ [2,y], [3,y], [4,y], [4,y+1], [4,y+2] ];
  } else if (t === 3) {
    return [ [2,y], [2,y+1], [2,y+2], [2,y+3] ];
  } else if (t === 4) {
    return [ [2,y+1], [2,y], [3,y+1], [3,y] ];
  } else {
    throw new Error('wtf');
  }
};

const left = (rock) => {
  if (rock.some(([x, _]) => x === 0)) {
    return rock;
  }
  return rock.map(([x, y]) => [x - 1, y]);
};

const right = (rock) => {
  if (rock.some(([x, _]) => x === 6)) {
    return rock;
  }
  return rock.map(([x, y]) => [x + 1, y]);
};

const down = (rock) => rock.map(([x, y]) => [x, y - 1]);

const up = (rock) => rock.map(([x, y]) => [x, y + 1]);

const overlap = (rock, ROCKS) => rock.some(([x, y]) => ROCKS.has(`${x},${y}`));

const maxY = (ROCKS) => Math.max(...[...ROCKS].map(c => parseInt(c.split(',')[1])));

const pattern = ROCKS => {
  const mY = maxY(ROCKS);
  return [...ROCKS]
    .map(c => c.split(',').map(Number))
    .filter(([_, y]) => mY - y <= 30);
};


let top = 0;
let jetIdx = 0;
let i = 0;
let added = 0;
const ROCKS = new Set();
const SEEN = {};
const TOTAL_ROCKS = 1000000000000;
const jets = input[0].split('');

for (let i = 0; i < 7; i++) {
  ROCKS.add(`${i},0`);
}

while (i < TOTAL_ROCKS) {
  let rock = getNextRock(i % 5, top + 4);
  let falling = true;

  while (falling) {
    if (jets[jetIdx] === '<') {
      rock = left(rock);
      if (overlap(rock, ROCKS)) rock = right(rock);
    } else {
      rock = right(rock);
      if (overlap(rock, ROCKS)) rock = left(rock);
    }

    jetIdx = (jetIdx + 1) % jets.length;
    rock = down(rock);

    // if rock hits other rocks or the bottom
    if (overlap(rock, ROCKS)) {
      rock = up(rock);
      rock.forEach(([x, y]) => ROCKS.add(`${x},${y}`));
      top = maxY(ROCKS);


      if (i >= 2022) {
        const p = pattern(ROCKS);
        const state = `${jetIdx},${i % 5},${p.join(':')}`;
        
        if (i >= 100000000) {
          console.log(i);
        }

        if (SEEN[state]) {
          console.log('seent');
          const [oldI, oldTop] = SEEN[state];
          const dy = top - oldTop;
          const dt = i = oldI;
          const amt = (TOTAL_ROCKS-i) / dt;
          added += amt * dy;
          i += amt * dt;
        }

        SEEN[state] = [i, top];
      }

      falling = false;
    }
  }

  i++;
  if (i === 2022) {
    console.log('Part one:', top); 
  }
}

console.log(top + added);