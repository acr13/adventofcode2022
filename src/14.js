import { readFile } from './helpers/read.js';

const input = readFile('14.txt');

const ROCKS = new Set();

for (let i = 0; i < input.length; i++) {
  const points = input[i].split(' -> ');
  let prev = null;

  for (let j = 0; j < points.length; j++) {
    const [x, y] = points[j].split(',').map(Number);

    if (prev !== null) {
      const dx = x - prev[0];
      const dy = y - prev[1];
      const len = Math.max(Math.abs(dx), Math.abs(dy));

      for (let k = 0; k <= len; k++) {
        const xx = prev[0] + (k * (dx > 0 ? 1 : dx < 0 ? -1 : 0));
        const yy = prev[1] + (k * (dy > 0 ? 1 : dy < 0 ? -1 : 0));
        ROCKS.add(`${xx},${yy}`)
      }
    }

    prev = [x, y];
  }
}

// setup some params...
let maxY = -1;
let maxX = -1;
let minX = Infinity;

for (const rock of ROCKS) {
  const [x, y] = rock.split(',').map(Number);
  if (y > maxY) maxY = y;
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
}
const floor = 2 + maxY;

minX -= 2000;
maxX += 2000;

// create a huge floor
for (let i = minX; i < maxX; i++) {
  ROCKS.add(`${i},${floor}`);
}

const run = () => {
  let p1 = false;

  // drop a lot of sands
  for (let i = 0; i < 1000000; i++) {
    let sand = [500, 0];
    let falling = true;
    // console.log('sand starts at', sand);

    while (falling) {
      // we're falling forever, we've fell thru the floor
      if (sand[1] + 1 >= floor && !p1) {
        console.log('Part one:', i);
        p1 = true;
        // return i;
      }

      // fall downward
      if (!ROCKS.has(`${sand[0]},${sand[1] + 1}`)) {
        sand = [sand[0], sand[1] + 1];
      } else if (!ROCKS.has(`${sand[0] - 1},${sand[1] + 1}`)) {
        // down to the left
        sand = [sand[0] - 1, sand[1] + 1];
      } else if (!ROCKS.has(`${sand[0] + 1},${sand[1] + 1}`)) {
        // down to the right
        sand = [sand[0] + 1, sand[1] + 1]; 
      } else {
        falling = false;
      }
    }

    if (sand[0] === 500 && sand[1] === 0) {
      console.log('Part two:', i + 1);
      return;
    }

    ROCKS.add(`${sand[0]},${sand[1]}`);
  }
};

run();
