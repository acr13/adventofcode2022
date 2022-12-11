import { readFileSync } from 'node:fs'

const input = readFileSync('./inputs/11.txt', 'utf-8').split(/\r?\n/);

const parse = () => {
  const monkeys = [];
  let monkey = {};

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      monkeys.push(monkey);
      monkey = {};
    } else {
      const words = input[i].trim().split(' ');

      if (words[0] === 'Starting') {
        monkey.items = [];
        for (let j = 2; j < words.length; j++) {
          monkey.items.push(parseInt(words[j]));
        }
      } else if (words[0] === 'Operation:') {
        monkey.op = [words[words.length - 2], words[words.length - 1]];
        if (words[words.length -1] !== 'old') {
          monkey.op[monkey.op.length - 1] = parseInt(monkey.op[monkey.op.length - 1]);
        }
      } else if (words[0] === 'Test:') {
        monkey.test = parseInt(words[words.length - 1]);
      } else if (words[0] === 'If') {
        if (words[1] === 'true:') {
          monkey.pass = parseInt(words[words.length - 1]);
        } else {
          monkey.fail = parseInt(words[words.length - 1]);
        }
      }
    }
  }

  return monkeys;
};



const run = (monkeys, rounds, divider) => {
  const inspected = monkeys.map(_ => 0);

  monkeys = monkeys.map(monkey => ({ ...monkey }));

  for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      let monkey = monkeys[j];

      for (let k = 0; k < monkey.items.length; k++) {
        inspected[j]++;

        let worry = monkey.items[k];
        const [operator, val] = monkey.op;

        if (operator === '*') {
          if (val === 'old') {
            worry *= worry;
          } else {
            worry *= val;
          }
        } else if (operator === '+') {
          if (val === 'old') {
            worry += worry;
          } else {
            worry += val;
          }
        }

        if (divider) {
          worry %= divider;
        } else {
          worry = Math.floor(worry / 3);
        }

        if (worry % monkey.test === 0) {
          monkeys[monkey.pass].items.push(worry);
        } else {
          monkeys[monkey.fail].items.push(worry);
        }
      }

      monkey.items = [];
    }
  }

  inspected.sort((a, b) => b - a);
  return inspected[0] * inspected[1];
};

const monkeys = parse(input);
const orig = JSON.parse(JSON.stringify(monkeys));
const divider = monkeys.reduce((prod, monkey) => prod * monkey.test, 1);

console.log('Part one:', run(monkeys, 20));
console.log('Part two:', run(orig, 10000, divider));