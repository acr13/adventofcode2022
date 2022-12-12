import { readFile } from './helpers/read.js';

const input = readFile('9.txt')
  .map(line => line.split(' '))
  .map(instr => [instr[0], Number(instr[1])]);

const DELTAS = {
  'R': [0, 1],
  'L': [0, -1],
  'U': [-1, 0],
  'D': [1, 0],
};

const nearby = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const isOverlap = (head, tail) => {
  if ((head[0] === tail[0] && head[1] === tail[1]) || 
    nearby.some(
      (neighbor) => tail[0] + neighbor[0] === head[0] && tail[1] + neighbor[1] === head[1],
    )
  ) {
    return true;
  }

  return false;
};

const moveKnot = (head, tail) => {
  const dx = head[1] - tail[1];
  const dy = head[0] - tail[0];
  const y = tail[0] + dy / (Math.abs(dy) || 1);
  const x = tail[1] + dx / (Math.abs(dx) || 1);

  return [y, x];
}

const p1 = (input) => {
  const visited = new Set();
  visited.add('0,0');
  const head = [0,0];
  let tail = [0,0];

  for (let [dir, amount] of input) {
    while (amount > 0) {
      amount--;

      const delta = DELTAS[dir];
      head[0] += delta[0];
      head[1] += delta[1];

      if (!isOverlap(head, tail)) {
        tail = moveKnot(head, tail);
      }

      visited.add(`${tail[0]},${tail[1]}`);
    }
  }

  return visited.size;
};

const p2 = (input) => {
  const visited = new Set();
  visited.add('0,0');
  const knots = Array.from({ length: 10 }, () => [0,0])

  for (let [dir, amount] of input) {
    while (amount > 0) {
      amount--;

      for (let i = 0; i < knots.length - 1; i++) {
        // move the head
        if (i === 0) {
          const delta = DELTAS[dir];
          knots[i][0] += delta[0];
          knots[i][1] += delta[1];
        }

        // move the knots
        if (!isOverlap(knots[i], knots[i + 1])) {
          knots[i + 1] = moveKnot(knots[i], knots[i + 1]);
        }
      }

      const tail = knots[knots.length - 1];
      visited.add(`${tail[0]},${tail[1]}`);
    }
  }

  return visited.size;
};

console.log('Part one:', p1(input));
console.log('Part one:', p2(input));