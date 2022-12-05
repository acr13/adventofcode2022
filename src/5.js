import { readFileSync } from 'node:fs'

const input = readFileSync('./inputs/5.txt', 'utf-8').split(/\r?\n/);

let ready = false;

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

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  if (ready) {
    const [_, amt, __, from, ___, to] = line.split(' ').map(Number);

    // p1
    // for (let j = 0; j < amt; j++) {
    //   const crate = stacks[from - 1].shift();
    //   stacks[to - 1].unshift(crate);
    // }

    // p2
    const crates = [];
    for (let j = 0; j < amt; j++) {
      crates.push(stacks[from - 1].shift());
    }
    stacks[to - 1].unshift(...crates);
  }

  if (line === '') ready = true;
}

console.log(stacks.map(stack => stack[0]).join('') );