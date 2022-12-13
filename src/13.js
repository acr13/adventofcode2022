import { readFile } from './helpers/read.js'

const input = readFile('13.txt');

const parse = (input) => {
  const packets = [];
  let packet = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      packets.push(packet);
      packet = [];
    } else {
      packet.push(eval(input[i]));
    }
  }

  return packets;
};

const compare = (left, right) => {
  if (!Array.isArray(left) && !Array.isArray(right)) {
    return left - right;
  } else {
    // at least one of the items is an array
    if (!Array.isArray(left)) left = [left]; // a wasn't array, now it is
		if (!Array.isArray(right)) right = [right]; // b wasn't array, now it is
    // both are now arrays

    for (let i = 0 ;i < Math.min(left.length, right.length); i++) {
      const valid = compare(left[i], right[i]);
      if (valid !== 0) {
        return valid;
      }
    }

    // sub lists are equal, compare length
    return left.length - right.length;
  }
}

const p1 = (input) => {
  let sum = 0;
  const packets = parse(input);

  for (let i = 0; i < packets.length; i++) {
    const [left, right] = packets[i];
    if (compare(left, right) < 0) {
      // console.log('index ', i, ', in the right order');
      sum += (i + 1);
    }
  }

  return sum;
};

const p2 = (input) => {
  const packets = parse(input);
  packets.push([ [[2]], [[6]] ]);

  const p2 = packets.flat().sort((left, right) => compare(left, right)).map(x => x.toString());
  return (p2.indexOf('2') + 1) * (p2.indexOf('6') + 1);
}

console.log('Part one:', p1(input));
console.log('Part two:', p2(input));