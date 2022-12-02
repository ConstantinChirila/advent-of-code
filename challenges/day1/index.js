import { text } from "./input";

export function day1() {
  const numbers = text
    .trim()
    .split("\n\n")
    .map((str) => str.split("\n").map(Number));

  const biggestSum = numbers
    .map((arr) => arr.reduce((partialSum, a) => partialSum + a, 0))
    .sort((a, b) => b - a);

  const top3Sum = biggestSum
    .slice(0, 3)
    .reduce((partialSum, a) => partialSum + a, 0);

  return {
    part1: biggestSum[0],
    part2: top3Sum,
    time: 18, //minutes
  };
}
