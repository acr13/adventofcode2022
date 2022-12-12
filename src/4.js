import { readFileSync } from 'node:fs'
import { readFile } from './helpers/read.js';

const input = readFile('4.txt');
let p1 = 0;
let p2 = 0;

for (let i = 0; i < input.length; i++) {
  const [left, right] = input[i].split(',');
  const [l1, l2] = left.split('-').map(Number);
  const [r1, r2] = right.split('-').map(Number);
  
  if (l1 >= r1 && l1 <= r2 && l2 >= r1 && l2 <= r2) {
    p1++;
  } else if (r1 >= l1 && r1 <= r2 && r2 >= l1 && r2 <= l2) {
    p1++;
  }

  if ((l1 >= r1 && l1 <= r2) || (r1 >= l1 && r1 <= l2)) {
    p2++;
  }
}

console.log('Part one:', p1);
console.log('Part two:', p2);
