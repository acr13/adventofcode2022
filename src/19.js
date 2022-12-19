import { readFile } from './helpers/read.js';

const input = readFile('19.example');

const key = (o, c, obs, geo, ro, rc, robs, rgeo, time) =>
  `${o},${c},${obs},${geo},${ro},${rc},${robs},${rgeo},${time}`;

const BFS = (costOre, costClay, costObsOre, costObsClay, costGeodeOre, costGeodeObs, time) => {
  // [ore, clay, obsidian, geodes, robotOres, robotClays, robotObs, robotGeodes, time]
  const Q = [ [0,0,0,0, 1,0,0,0, time] ];
  const SEEN = new Set();
  let max = -1;

  // console.log(costOre, costClay, costObsOre, costObsClay, costGeodeOre, costGeodeObs, time);

  while (Q.length > 0) {
    let [ore, clay, obsidian, geodes, robotOres, robotClays, robotObs, robotGeodes, time] = Q.shift();

    max = Math.max(max, geodes);
    if (time === 0) continue;    

    // optimizations
    const MAX_ORE_COST = Math.max(costOre, costClay, costObsOre, costGeodeOre);
    if (robotOres >= MAX_ORE_COST) {
      robotOres = MAX_ORE_COST;
    }
    if (robotClays >= costObsClay) {
      robotClays = costObsClay;
    }
    if (robotObs >= costGeodeObs) {
      robotObs = costGeodeObs;
    }
    if (ore >= (time * MAX_ORE_COST) - (robotOres * (time - 1))) {
      ore = (time * MAX_ORE_COST) - (robotOres * (time - 1));
    }
    if (clay >= (time * costObsClay) - (robotClays * (time - 1))) {
      clay = (time * costObsClay) - (robotClays * (time - 1));
    }
    if (obsidian >= (time * costGeodeObs) - (robotObs * (time - 1))) {
      obsidian = (time * costGeodeObs) - (robotObs * (time - 1));
    }

    const k = key(ore, clay, obsidian, geodes, robotOres, robotClays, robotObs, robotGeodes, time);
    if (SEEN.has(k)) continue;
    SEEN.add(k);

    if (SEEN.size % 1000000 == 0) {
      console.log(time, best, SEEN.size);
    }
            
    // assert o>=0 and c>=0 and ob>=0 and g>=0, state

    // do nothing, robots mine resources
    Q.push([
      ore + robotOres, clay + robotClays, obsidian + robotObs, geodes + robotGeodes,
      robotOres, robotClays, robotObs, robotGeodes, time - 1
    ]);
    // build robots
    if (ore >= costOre) {
      Q.push([
        ore + robotOres - costOre, clay + robotClays, obsidian + robotObs, geodes + robotGeodes,
        robotOres + 1, robotClays, robotObs, robotGeodes, time - 1
      ]);
    }
    if (ore >= costClay) {
      Q.push([
        ore + robotOres - costClay, clay + robotClays, obsidian + robotObs, geodes + robotGeodes,
        robotOres, robotClays + 1, robotObs, robotGeodes, time - 1]);
    }
    if (ore >= costObsOre && clay >= costObsClay) {
      Q.push([
        ore + robotOres - costObsOre, clay + robotClays - costObsClay, obsidian + robotObs, geodes + robotGeodes,
        robotOres, robotClays, robotObs + 1, robotGeodes, time - 1]);
    }
    if (ore >= costGeodeOre && obsidian >= costGeodeObs) {
      Q.push([
        ore + robotOres - costGeodeOre, clay + robotClays, obsidian + robotObs - costGeodeObs, geodes + robotGeodes,
        robotOres, robotClays, robotObs, robotGeodes + 1, time - 1]);
    }
  }

  return max;
};

let p1 = 0;
let p2 = 1;

for (let i = 0; i < input.length; i++) {
  const words = input[i].split(' ');

  const id = parseInt(words[1].split(':')[0]);
  const costOre = parseInt(words[[6]]);
  const costClay = parseInt(words[[12]]);
  const costObsOre = parseInt(words[18]);
  const costObsClay = parseInt(words[21]);
  const costGeodeOre = parseInt(words[27]);
  const costGeodeObs = parseInt(words[30]);

  console.log(costOre, costClay, costObsOre, costObsClay, costGeodeOre, costGeodeObs);

  const qual = BFS(costOre, costClay, costObsOre, costObsClay, costGeodeOre, costGeodeObs, 24);
  console.log('max = ', qual);
  p1 += id * qual;

  if (i < 3) {
    const s2 = solve(ore_cost, clay_cost, obsidian_cost_ore, obsidian_cost_clay, geode_cost_ore, geode_cost_clay,32)
    p2 *= s2
  }
}

console.log('Part one:', p1);
console.log('Part two:', p2);