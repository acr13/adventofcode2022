import { readFileSync } from 'node:fs'

const input = readFileSync('./inputs/7.txt', 'utf-8').split(/\r?\n/);

const path = [];
const sizes = {};

for (let i = 0; i < input.length; i++) {
  const words = input[i].split(' ');

  if (words[1] === 'cd') {
    if (words[2] === '..') {
      path.pop();
    } else {
      path.push(words[2]);
    }
  } else if (words[1] === 'ls') {
    continue; // ignore
  } else { // output of an ls
    if (words[0] !== 'dir') { // ignore the dirs
      const size = Number(words[0]);

      // add this size to the current dir and all dirs 'above' it
      // (work outside -> in)
      let key = '';
      for (let j = 0; j < path.length; j++) {
        key += path[j];
        if (!sizes[key]) sizes[key] = 0;
        sizes[key] += size;
      }
    }
  }
}

const p1 = Object.values(sizes).reduce((sum, size) => size <= 100000 ? sum + size : sum, 0);
console.log('Part one:', p1);

const TOTAL = 70000000;

let min = Infinity;
for (const [key, size] of Object.entries(sizes)) {
  if ((TOTAL - sizes['/'] + size) >= 30000000) {
    if (size < min) min = size;
  }
}

console.log('Part two:', min);