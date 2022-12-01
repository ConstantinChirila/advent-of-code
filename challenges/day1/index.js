import { text } from "./input";

export function day1() {
  const numbers = text
    .split(/\n/)
    .map((i) => (i ? i : "|"))
    .join(" ")
    .split("|")
    .map((i) =>
      i
        ? i
            .trim()
            .split(" ")
            .map((i) => parseInt(i))
        : null
    )
    .filter(Boolean);

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
