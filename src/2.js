import { readFile } from './helpers/read.js';

const input = readFile('2.txt')
  .map(line => line.split(' '));

const SHAPE_SCORE = {
  'A': 1, 'B': 2, 'C': 3,
  'X': 1, 'Y': 2, 'Z': 3
};

const didIWin = (you, me) => {
  if (you === 'A' && me === 'Y') {
    return 1;
  } else if (you === 'A' && me === 'Z') {
    return -1;
  } else if (you === 'B' && me === 'X') {
    return -1;
  } else if (you === 'B' && me === 'Z') {
    return 1;
  } else if (you === 'C' && me === 'X') {
    return 1;
  } else if (you === 'C' && me === 'Y') {
    return -1;
  }

  return 0;
};

const p1 = (input) => {
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const [you, me] = input[i];
    const whoWon = didIWin(you, me);
    total += SHAPE_SCORE[me];
  
    if (whoWon === 1) {
      total += 6;
    } else if (whoWon === 0) {
      total += 3;
    }
  }

  return total;
};

const p2 = (input) => {
  const LOSING_SHAPES = { 'A': 'Z', 'B': 'X', 'C': 'Y' };
  const WINNING_SHAPES = { 'A': 'Y', 'B': 'Z', 'C': 'X' };

  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const [you, outcome] = input[i];

    if (outcome === 'X') {
      total += SHAPE_SCORE[LOSING_SHAPES[you]];
    } else if (outcome === 'Y') {
      total += 3 + SHAPE_SCORE[you];
    } else {
      total += 6 + SHAPE_SCORE[WINNING_SHAPES[you]];
    }
  }

  return total;
};

console.log('Part one:', p1(input));
console.log('Part two:', p2(input));