import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { sum } from "../../utils";
import { TEXT } from "./input";

function runChallenge() {
  const numbers = TEXT.trim()
    .split("\n\n")
    .map((str) => str.split("\n").map(Number));

  const biggestSum = numbers
    .map((arr) => arr.reduce(sum, 0))
    .sort((a, b) => b - a);

  const top3Sum = biggestSum.slice(0, 3).reduce(sum, 0);

  return {
    part1: biggestSum[0],
    part2: top3Sum,
  };
}

export function day1() {
  // Cached results as it can be expensive to run all the challenges at once.
  return {
    ...(!EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 72718,
          part2: 213089,
        }),
    time: 18,
    hasGo: true,
  };
}
