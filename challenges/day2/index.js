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

  let totalScorePart1 = 0;
  let totalScorePart2 = 0;

  games.forEach((game) => {
    const [opponent, player] = game.split(" ");

    const gameResult = NORMAL_GAME_RESULT[opponent][player];
    totalScorePart1 += SCORE[gameResult] + SCORE[player];

    const gameResultPart2 = GAME_RESULT_PART2[opponent][player];
    const desired = DESIRED_RESULT[player];
    totalScorePart2 += SCORE[gameResultPart2] + SCORE[desired];
  });

  return {
    part1: totalScorePart1,
    part2: totalScorePart2,
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
