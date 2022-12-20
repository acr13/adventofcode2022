import { readFileToIntegers } from './helpers/read.js';
import Dequeue from 'double-ended-queue';

const input = readFileToIntegers('20.txt');

const convertToQueue = (input, p2) => {
  const q = new Dequeue();

  for (let i = 0; i < input.length; i++) {
    q.push([i, p2 ? input[i] * 811589153 : input[i]]);
  }
  
  return q;
}

const p1 = (input, p2) => {
  const X = convertToQueue(input, p2);

  const times = p2 ? 10 : 1;
  let n = 0;
  while (n < times) {
    for (let i = 0; i < X.length; i++) {
      // starting with index 0, find each # in the list
      for (let j = 0; j < X.length; j++) {
        if (X.get(j)[0] === i) break;
      }

      // shift the list so this number is first
      while (X.get(0)[0] !== i) {
        X.push(X.shift());
      }

      const val = X.shift();
      let toPop = val[1];
      toPop %= X.length;

      for (let k = 0; k < toPop; k++) {
        X.push(X.shift());
      }
      X.push(val);
    }
    n++;
  }

  let zeroIdx = 0;
  while (X.get(zeroIdx)[1] !== 0) {
    zeroIdx++;
  }
  // console.log(zeroIdx);
  return X.get((zeroIdx + 1000) % X.length)[1] +
    X.get((zeroIdx + 2000) % X.length)[1] +
    X.get((zeroIdx + 3000) % X.length)[1];
};

console.log('Part one:', p1(input));
console.log('Part two:', p1(input, true));

