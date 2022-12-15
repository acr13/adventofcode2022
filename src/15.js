import { readFile } from './helpers/read.js';

const input = readFile('15.txt');
const S = new Set();
const B = new Set();

for (let i = 0; i < input.length; i++) {
  const words = input[i].split(' ');
  const sxstr = words[2];
  const systr = words[3];
  const bxstr = words[8];
  const bystr = words[9];
  
  const sx = parseInt(sxstr.split('=')[1]);
  const sy = parseInt(systr.split('=')[1]);
  const bx = parseInt(bxstr.split('=')[1]);
  const by = parseInt(bystr.split('=')[1]);

  // manhattan distance or length of deadzone
  const d = Math.abs(sx - bx) + Math.abs(sy - by);
  S.add(`${sx},${sy},${d}`);
  B.add(`${bx},${by}`);
}

const valid = (x, y) => {
  for (const s of S) {
    const [sx, sy, d] = s.split(',').map(Number);
    const dxy = Math.abs(x - sx) + Math.abs(y - sy);

    if (dxy <= d) {
      return false;
    }
  }

  return true;
};

// const p1 = () => {
//   let n = 0;
//   for (let x = -10000000; x < 10000000; x++) {
//     const y = 2000000; // 10;
//     if (!valid(x, y) && !B.has(`${x},${y}`)) {
//       n++;
//     }
//   }
//   return n;
// };

const p2 = () => {
  const signs = [[-1, -1],[-1, 1], [1, -1], [1, 1]];

  for (const s of S) {
    const [sx, sy, d] = s.split(',').map(Number);

    for (let dx = 0; dx < (d + 2); dx++) {
      const dy = (d + 1) - dx;

      for (let i = 0; i < signs.length; i++) {
        const [signx, signy] = signs[i];
        const x = sx + (dx * signx);
        const y = sy + (dy * signy);

        if (x < 0 || x > 4000000 || y < 0 || y > 4000000) {
          continue;
        }

        if (valid(x,y)) {
          return x * 4000000 + y;
        }
      };
    }
  }
};

// console.log('Part one:', p1());
console.log('Part two:', p2());