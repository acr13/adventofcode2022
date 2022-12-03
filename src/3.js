import { readFileSync } from 'node:fs'

const input = readFileSync('./inputs/3.txt', 'utf-8')
  .split(/\r?\n/);

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const p1 = (input) => {
  return input.reduce((sum, line) => {
    const mid = line.length / 2;
    const front = line.substring(0, mid);
    const back = line.substring(mid);
    const hash = {};
    for (let i = 0; i < front.length; i++) {
      const c = front.charAt(i);
      if (!hash[c]) hash[c] = 0;
      hash[c]++;
    }

    for (let i = 0; i < back.length; i++) {
      const c = back.charAt(i);
      if (hash[c]) {
        return sum + LETTERS.indexOf(c) + 1;
      }
    }

  }, 0);
};

const p2 = (input) => {
  const GROUP_LENGTH = 3;
  let sum = 0;
  let sacks = [];

  for (let i = 0; i < input.length; i++) {
    if (sacks.length < GROUP_LENGTH - 1) {
      const hash = {};
      for (let j = 0; j < input[i].length; j++) {
        const c = input[i].charAt(j);
        if (!hash[c]) hash[c] = 0;
        hash[c]++;
      }
      sacks.push(hash);
    } else {
      for (let j = 0; j < input[i].length; j++) {
        const c = input[i].charAt(j);
        if (sacks[0][c] && sacks[1][c]) {
          sum += LETTERS.indexOf(c) + 1;
          break;
        }
      }
      sacks = [];      
    }
  }

  return sum;
};

console.log('Part one:', p1(input));
console.log('Part two:', p2(input));