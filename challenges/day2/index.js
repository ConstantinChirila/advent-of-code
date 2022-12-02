import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { sum } from "../../utils";
import { TEXT } from "./input";
import {
  SCORE,
  NORMAL_GAME_RESULT,
  DESIRED_RESULT,
  GAME_RESULT_PART2,
} from "./constants";

function runChallenge() {
  const games = TEXT.trim()
    .split("\n\n")
    .map((str) => str.split("\n"))[0];

  const calculateScore = games.map((game) => {
    const [opponent, player] = game.split(" ");
    const gameResult = NORMAL_GAME_RESULT[opponent][player];
    return SCORE[gameResult] + SCORE[player];
  });

  const calculateScorePart2 = games.map((game) => {
    const [opponent, player] = game.split(" ");
    const gameResult = GAME_RESULT_PART2[opponent][player];
    const desired = DESIRED_RESULT[player];
    return SCORE[gameResult] + SCORE[desired];
  });

  return {
    part1: calculateScore.reduce(sum, 0),
    part2: calculateScorePart2.reduce(sum, 0),
  };
}

export function day2() {
  // Cached results as it can be expensive to run all the challenges at once.
  return {
    ...(EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 13675,
          part2: 14184,
        }),
    time: 23,
  };
}
