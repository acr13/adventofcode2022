import { readFile } from './helpers/read.js';

const input = readFile('5.txt');

// const stacks = [['N', 'Z'], ['D', 'C', 'M'], ['P']];
const stacks = [
  ['Z', 'V', 'T', 'B', 'J', 'G', 'R'],
  ['L', 'V', 'R', 'J'],
  ['F', 'Q', 'S'],
  ['G', 'Q', 'V', 'F', 'L', 'N', 'H', 'Z'],
  ['W', 'M', 'S', 'C', 'J', 'T', 'Q', 'R'],
  ['F', 'H', 'C', 'T', 'W', 'S'],
  ['J', 'N', 'F', 'V', 'C', 'Z', 'D'],
  ['Q', 'F', 'R', 'W', 'D', 'Z', 'G', 'L'],
  ['P', 'V', 'W', 'B', 'J'],
];

const p1 = JSON.parse(JSON.stringify(stacks));
const p2 = JSON.parse(JSON.stringify(stacks));
let ready = false;

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  if (ready) {
    const [_, amt, __, from, ___, to] = line.split(' ').map(Number);

    // p1
    for (let j = 0; j < amt; j++) {
      const crate = p1[from - 1].shift();
      p1[to - 1].unshift(crate);
    }

    // p2
    const crates = [];
    for (let j = 0; j < amt; j++) {
      crates.push(p2[from - 1].shift());
    }
    p2[to - 1].unshift(...crates);
  }

  if (line === '') ready = true;
}

console.log('Part one:', p1.map(stack => stack[0]).join(''));
console.log('Part two:', p2.map(stack => stack[0]).join(''));
