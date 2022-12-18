import { readFile } from './helpers/read.js';

const CUBES = new Set();
const cubes = readFile('18.txt')
  .map(line => {
    CUBES.add(line);
    return line.split(',').map(Number)
  });

const p1 = () => {
  let ans = 0;

  for (let i = 0; i < cubes.length; i++) {
    const [x,y,z] = cubes[i];

    if (!CUBES.has(`${x+1},${y},${z}`)) ans++;
    if (!CUBES.has(`${x-1},${y},${z}`)) ans++;
    if (!CUBES.has(`${x},${y+1},${z}`)) ans++;
    if (!CUBES.has(`${x},${y-1},${z}`)) ans++;
    if (!CUBES.has(`${x},${y},${z+1}`)) ans++;
    if (!CUBES.has(`${x},${y},${z-1}`)) ans++;
  }

  return ans;
};

const OUT = new Set();
const IN = new Set();

const isOutside = (x,y,z) => {
  if (OUT.has(`${x},${y},${z}`)) {
    return true;
  } else if (IN.has(`${x},${y},${z}`)) {
    return false;
  }

  const SEEN = new Set();
  const Q = [ [x,y,z] ];
  while (Q.length > 0) {
    const [x,y,z] = Q.shift();

    if (CUBES.has(`${x},${y},${z}`)) continue;
    if (SEEN.has(`${x},${y},${z}`)) continue;
    SEEN.add(`${x},${y},${z}`);

    if (SEEN.size > 5000) {
      [...SEEN].forEach(seen => OUT.add(seen));
      return true;
    }

    Q.push([x+1,y,z]);
    Q.push([x-1,y,z]);
    Q.push([x,y+1,z]);
    Q.push([x,y-1,z]);
    Q.push([x,y,z+1]);
    Q.push([x,y,z-1]);
  }

  [...SEEN].forEach(seen => IN.add(seen));
  return false;
};

const p2 = () => {
  let ans = 0;

  for (let i = 0; i < cubes.length; i++) {
    const [x,y,z] = cubes[i];
    if (isOutside(x+1,y,z)) ans++;
    if (isOutside(x-1,y,z)) ans++;
    if (isOutside(x,y+1,z)) ans++;
    if (isOutside(x,y-1,z)) ans++;
    if (isOutside(x,y,z+1)) ans++;
    if (isOutside(x,y,z-1)) ans++;
  }

  return ans;
};

console.log('Part one:', p1());
console.log('Part one:', p2());
