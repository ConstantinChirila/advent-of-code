import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { sum } from "../../utils";
import { TEXT } from "./input";
//get alphabet in array
const CHARACTER_ORDER =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function runChallenge() {
  const backpacks = TEXT.trim()
    .split("\n\n")
    .map((str) => str.split("\n"))[0];

  const priorityScore = backpacks.map((b) => {
    const half = b.length / 2;
    const firstHalf = b.slice(0, half);
    const secondHalf = b.slice(half);

    const commonLetters = firstHalf
      .split("")
      .filter((char) => secondHalf.includes(char));

    return getPriority(commonLetters[0]);
  });

  const groupedBackpacks = getGroups(backpacks);
  const priorityScorePart2 = groupedBackpacks.map((group) => {
    const commonLetters = group[0]
      .split("")
      .filter((char) => group[1].includes(char) && group[2].includes(char));
    return getPriority(commonLetters[0]);
  });

  return {
    part1: priorityScore.reduce(sum, 0),
    part2: priorityScorePart2.reduce(sum, 0),
  };
}

function getPriority(item) {
  const index = CHARACTER_ORDER.findIndex((char) => char === item);

  return index + 1;
}

function getGroups(items) {
  const groups = [];

  let currentGroup = [];
  for (const item of items) {
    currentGroup.push(item);

    if (currentGroup.length === 3) {
      groups.push(currentGroup);
      currentGroup = [];
    }
  }

  return groups;
}

export function day3() {
  // Cached results as it can be expensive to run all the challenges at once. Used to present on the UI
  return {
    ...(EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 8185,
          part2: 2817,
        }),
    time: 28,
    hasGo: false,
  };
}
