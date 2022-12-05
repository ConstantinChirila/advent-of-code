import { cloneDeep } from "lodash";
import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { INITIAL, INSTRUCTIONS } from "./input";

function runChallenge() {
  const moves = INSTRUCTIONS.trim()
    .split("\n\n")
    .map((str) => str.split("\n"))[0]
    .map((str) => {
      return str
        .replace("move ", "")
        .replace(" from ", "-")
        .replace(" to ", "-")
        .split("-")
        .map(Number);
    });

  const finalStatePart1 = moveCrates(moves);
  const finalStatePart2 = moveCrates(moves, true);

  const finalStateStringPart1 = finalStatePart1
    .map((container) => container[container.length - 1])
    .join("");

  const finalStateStringPart2 = finalStatePart2
    .map((container) => container[container.length - 1])
    .join("");

  return {
    part1: finalStateStringPart1,
    part2: finalStateStringPart2,
  };
}

function getStacks() {
  const convertedStack = INITIAL.split("\n").map((str) => {
    return str
      .replaceAll("    ", " [-] ")
      .replaceAll(" ", "")
      .replaceAll("[", "")
      .replaceAll("]", "")
      .split("");
  });
  const stackArray = [[], [], [], [], [], [], [], [], []];
  convertedStack.splice(0, 8).forEach((arr, i) => {
    stackArray.forEach((_, index) => {
      if (arr[index] !== "-") {
        stackArray[index] = [...stackArray[index], arr[index]];
      }
    });
  });
  return stackArray.map((arr) => arr.reverse());
}

function moveCrates(moves, part2) {
  const finalState = getStacks();
  for (const move of moves) {
    const [quantity, from, to] = move;
    const fromStack = finalState[from - 1];
    const toStack = finalState[to - 1];
    const itemsToMove = part2
      ? fromStack.slice(-quantity)
      : fromStack.slice(-quantity).reverse();
    fromStack.splice(-quantity, quantity);
    finalState[to - 1] = [...toStack, ...itemsToMove];
    finalState[from - 1] = fromStack;
  }
  return finalState;
}

export function day5() {
  // Cached results as it can be expensive to run all the challenges at once. Used to present on the UI
  return {
    ...(!EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: "VCTFTJQCG",
          part2: "GCFGLDNJZ",
        }),
    time: 32,
    hasGo: false,
  };
}
