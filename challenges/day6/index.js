import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { TEXT } from "./input";

function runChallenge() {
  const chars = TEXT.split("");

  let found1, found2;
  chars.forEach((_, index) => {
    const group1 = chars.slice(index, index + 4);
    const set1 = new Set(group1);
    const group2 = chars.slice(index, index + 14);
    const set2 = new Set(group2);

    if (set1.size === 4 && !found1) {
      found1 = index + 4;
    }
    if (set2.size === 14 && !found2) {
      found2 = index + 14;
    }
  });

  return {
    part1: found1,
    part2: found2,
  };
}

export function day6() {
  // Cached results as it can be expensive to run all the challenges at once. Used to present on the UI
  return {
    ...(EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 1876,
          part2: 2202,
        }),
    time: 15,
    hasGo: false,
  };
}
