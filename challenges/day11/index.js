import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { text } from "./input";

function runChallenge() {
  // Your code here

  return {
    part1: 0,
    part2: 0,
  };
}

export function day11() {
  // Cached results as it can be expensive to run all the challenges at once. Used to present on the UI
  return {
    ...(EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 0,
          part2: 0,
        }),
    time: 0,
    hasGo: false,
  };
}
