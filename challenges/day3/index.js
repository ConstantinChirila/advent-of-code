import { text } from "./input";

function runChallenge() {
  // Your code here

  return {
    part1: 0,
    part2: 0,
  };
}

export function day2() {
  // Cached results as it can be expensive to run all the challenges at once.
  return {
    ...(!EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 13675,
          part2: 14184,
        }),
    time: 23,
    hasGo: true,
  };
}
