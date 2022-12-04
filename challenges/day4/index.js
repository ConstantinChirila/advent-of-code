import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { TEXT } from "./input";

function runChallenge() {
  const groups = TEXT.trim()
    .split("\n\n")
    .map((str) => str.split("\n"))[0];
  const fullyContainedTotal = groups
    .map((group) => {
      const split = group.split(",");
      const firstPair = split[0].split("-").map(Number);
      const secondPair = split[1].split("-").map(Number);

      return checkFullyContained(firstPair, secondPair);
    })
    .filter(Boolean).length;

  const partiallyContainedTotal = groups
    .map((group) => {
      const split = group.split(",");
      const firstPair = split[0].split("-").map(Number);
      const secondPair = split[1].split("-").map(Number);

      return checkOverlap(firstPair, secondPair);
    })
    .filter(Boolean).length;
  return {
    part1: fullyContainedTotal,
    part2: partiallyContainedTotal,
  };
}

//check if number ranges overlap
const checkOverlap = (firstPair, secondPair) => {
  const [firstMin, firstMax] = firstPair;
  const [secondMin, secondMax] = secondPair;

  return (
    (firstMin >= secondMin && firstMin <= secondMax) ||
    (firstMax >= secondMin && firstMax <= secondMax) ||
    (secondMin >= firstMin && secondMin <= firstMax) ||
    (secondMax >= firstMin && secondMax <= firstMax)
  );
};

const checkFullyContained = (firstPair, secondPair) => {
  const [firstMin, firstMax] = firstPair;
  const [secondMin, secondMax] = secondPair;

  return (
    (firstMin >= secondMin && firstMax <= secondMax) ||
    (secondMin >= firstMin && secondMax <= firstMax)
  );
};

export function day4() {
  // Cached results as it can be expensive to run all the challenges at once. Used to present on the UI
  return {
    ...(EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 444,
          part2: 801,
        }),
    time: 14,
    hasGo: true,
  };
}
