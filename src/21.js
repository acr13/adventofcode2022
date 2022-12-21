import { readFile } from './helpers/read.js';

const input = readFile('21.txt');
const monkeys = input.reduce((acc, line) => {
  const parts = line.split(' ');
  const left = parts[0].split(':')[0];
  const right = parts.length === 2 ? parseInt(parts[1]) : parts.slice(1);

  acc[left] = right;
  return acc;
}, {});

const recurse = (monkeys, word) => {
  if (Number.isInteger(monkeys[word])) {
    return monkeys[word];
  }

  const equation = monkeys[word];
  return eval([recurse(monkeys, equation[0]), equation[1], recurse(monkeys, equation[2])].join(' '));
};

const p1 = (monkeys) => recurse(monkeys, 'root');

const p2Recurse = (monkeys, word) => {
  if (Number.isInteger(monkeys[word])) {
    return monkeys[word];
  }

  const equation = monkeys[word];
  const left = recurse(monkeys, equation[0]);
  const right = recurse(monkeys, equation[2]);

  if (word === 'root') {
    return { pass: left === right, diff: left - right };
  }

  return eval([left, equation[1], right].join(' '));
}

const p2 = (monkeys) => {
  let lo = 0;
  let hi = 10000000000000;

  while (lo < hi) {
    let mid = Math.floor((lo + hi) / 2);

    monkeys['humn'] = mid;
    const { pass, diff } = p2Recurse(monkeys, 'root');

    if (pass) {
      return mid;
    }

    if (diff > 0) {
      lo = mid;
    } else if (diff < 0) {
      hi = mid;
    }
  }
};

console.log('Part one:', p1(monkeys));
console.log('Part two:', p2(monkeys));
