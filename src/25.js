import { readFile } from './helpers/read.js';

const input = readFile('25.txt');

const snafu = (str) => {
  const L = str.length;
  return [...str].map((val, idx) => {
    if (val === '=') {
      return Math.pow(5, L - idx - 1) * -2;
    } else if (val === '-') {
      return Math.pow(5, L - idx - 1) * -1;
    } else {
      return Math.pow(5, L - idx - 1) * Number(val);
    }
  }).reduce((sum, val) => sum + val, 0);
};


const sum = input.map(snafu).reduce((sum, val) => sum + val, 0);

const toSnafu = (number) => {
  if (number) {
    const quotient = Math.floor((number + 2) / 5);
    const remainder = (number + 2) % 5;
    const DIGITS = '=-012';
    return toSnafu(quotient) + DIGITS.charAt(remainder);
  }

  return '';
};

console.log('Part one:', toSnafu(sum));

