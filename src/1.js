import { readFileToIntegers } from './helpers/read.js';

const calories = readFileToIntegers('1.txt');

const sums = [];
let sum = 0;

for (let i = 0; i < calories.length; i++) {
  sum += calories[i];
  if (calories[i] === 0) {
    sums.push(sum);
    sum = 0;
  }
}

sums.sort((a, b) => b - a);
console.log('Part one:', sums[0]);
console.log('Part two:', sums[0] + sums[1] + sums[2]);