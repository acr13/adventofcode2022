import { readFileSync } from 'node:fs'

const input = readFileSync('./inputs/10.txt', 'utf-8').split(/\r?\n/);

let x = 1;
let cycles = 0;
let sum = 0;
let s = '';

const drawPixel = (cycles, x) => {
  let c = cycles;
  while (c > 40) {
    c -= 40;
  }

  if ((c - 2 === x) || (c - 1) === x || c === x) {
    s += '#';
  } else {
    s += '.';
  }
};

for (let i = 0; i < input.length; i++) {
  const [instr, amnt] = input[i].split(' ');
  cycles++;
  
  drawPixel(cycles, x);
  if (cycles === 20 || (cycles - 20) % 40 === 0) {
    sum += cycles * x;
  }

  if (instr === 'noop') {
    continue;
  } else if (instr === 'addx') {
    cycles++;


    drawPixel(cycles, x);
    if (cycles === 20 || (cycles - 20) % 40 === 0) {
      sum += cycles * x;
    }

    x += Number(amnt);
  }
}

console.log('Part one:', sum);
console.log('Part two:');

for (let i = 0; i < 6; i++) {
  console.log(s.substring(i * 40, i * 40 + 40));
}
