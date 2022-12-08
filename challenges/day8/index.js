import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { TEXT } from "./input";

function runChallenge() {
  const treeGrid = TEXT.trim()
    .split("\n")
    .map((row) => row.split("").map(Number));

  const visibleTrees = getResultPart1(treeGrid);
  const bestScore = getResultPart2(treeGrid);

  return {
    part1: visibleTrees,
    part2: bestScore,
  };
}

function getResultPart1(treeGrid) {
  let visibleTrees = 0;

  treeGrid.forEach((_, rowIndex) => {
    treeGrid.forEach((_, colIndex) => {
      if (
        rowIndex === 0 ||
        colIndex === 0 ||
        rowIndex === treeGrid.length - 1 ||
        colIndex === treeGrid[rowIndex].length - 1
      ) {
        visibleTrees++;
        return;
      } else {
        const height = treeGrid[rowIndex][colIndex];
        const isLeft = isLeftVisible(height, rowIndex, colIndex);
        const isRight = isRightVisible(height, rowIndex, colIndex);
        const isTop = isTopVisible(height, rowIndex, colIndex);
        const isBottom = isBottomVisible(height, rowIndex, colIndex);

        if (isLeft || isRight || isTop || isBottom) {
          visibleTrees++;
        }
      }
    });
  });

  function isTaller(trees, height) {
    return trees.every((tree) => height > tree);
  }

  function isLeftVisible(height, rowIndex, colIndex) {
    const leftTrees = treeGrid[rowIndex].slice(0, colIndex);
    return isTaller(leftTrees, height);
  }

  function isRightVisible(height, rowIndex, colIndex) {
    const rightTrees = treeGrid[rowIndex].slice(colIndex + 1);
    return isTaller(rightTrees, height);
  }
  function isTopVisible(height, rowIndex, colIndex) {
    const topTrees = treeGrid.slice(0, rowIndex).map((row) => row[colIndex]);
    return isTaller(topTrees, height);
  }
  function isBottomVisible(height, rowIndex, colIndex) {
    const bottomTrees = treeGrid
      .slice(rowIndex + 1)
      .map((row) => row[colIndex]);
    return isTaller(bottomTrees, height);
  }
  return visibleTrees;
}
function getResultPart2(treeGrid) {
  function getScore(trees, height) {
    let score = 0;
    for (let i = 0; i < trees.length; i++) {
      score++;
      if (trees[i] < height) continue;
      if (trees[i] >= height) break;
    }
    return score || 1;
  }

  function getLeftScore(height, rowIndex, colIndex) {
    const leftTrees = treeGrid[rowIndex].slice(0, colIndex).reverse();
    return getScore(leftTrees, height);
  }

  function getRightScore(height, rowIndex, colIndex) {
    const rightTrees = treeGrid[rowIndex].slice(colIndex + 1);
    return getScore(rightTrees, height);
  }
  function getTopScore(height, rowIndex, colIndex) {
    const topTrees = treeGrid
      .slice(0, rowIndex)
      .map((row) => row[colIndex])
      .reverse();
    return getScore(topTrees, height);
  }
  function getBottomScore(height, rowIndex, colIndex) {
    const bottomTrees = treeGrid
      .slice(rowIndex + 1)
      .map((row) => row[colIndex]);
    return getScore(bottomTrees, height);
  }

  const score = [];

  treeGrid.forEach((_, rowIndex) => {
    treeGrid.forEach((_, colIndex) => {
      if (
        rowIndex === 0 ||
        colIndex === 0 ||
        rowIndex === treeGrid.length - 1 ||
        colIndex === treeGrid[rowIndex].length - 1
      ) {
        return;
      } else {
        const height = treeGrid[rowIndex][colIndex];
        const leftScore = getLeftScore(height, rowIndex, colIndex);
        const rightScore = getRightScore(height, rowIndex, colIndex);
        const topScore = getTopScore(height, rowIndex, colIndex);
        const bottomScore = getBottomScore(height, rowIndex, colIndex);
        score.push(leftScore * rightScore * topScore * bottomScore);
      }
    });
  });
  return Math.max(...score);
}
export function day8() {
  // Cached results as it can be expensive to run all the challenges at once. Used to present on the UI
  return {
    ...(EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 1803,
          part2: 268912,
        }),
    time: 53,
    hasGo: false,
  };
}
