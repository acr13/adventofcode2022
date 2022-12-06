import { readFileSync } from 'node:fs'

const [ input ] = readFileSync('./inputs/6.txt', 'utf-8').split(/\r?\n/);

const PART_ONE = 4;
const PART_TWO = 14;

for (let i = PART_ONE - 1; i < input.length; i++) {
  const packet = input.substring(i - (PART_ONE - 1), i + 1);
  const set = new Set(packet);
  if (set.size === PART_ONE) {
    console.log('Part one:', i + 1);
    break;
  }
}

for (let i = PART_TWO - 1; i < input.length; i++) {
  const packet = input.substring(i - (PART_TWO - 1), i + 1);
  const set = new Set(packet);
  if (set.size === PART_TWO) {
    console.log('Part two:', i + 1);
    break;
  }
}