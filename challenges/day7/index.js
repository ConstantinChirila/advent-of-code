import { EXECUTE_ALL_CHALLENGES } from "../../config";
import { sum } from "../../utils";
import { TEXT } from "./input";

function runChallenge() {
  const lines = TEXT.trim()
    .split("\n\n")
    .map((str) => str.split("\n"))[0];

  const directoryStructure = {};
  let currentPath = [];
  lines.forEach((line) => {
    const isCommand = line.startsWith("$");
    if (isCommand) {
      const isList = line.startsWith("$ ls");
      const isCD = line.startsWith("$ cd");
      if (isList) {
        return;
      }

      if (isCD) {
        const path = line.replace("$ cd ", "");
        if (path === "..") {
          currentPath.pop();
        } else {
          currentPath.push(path);
        }
      }

      return;
    }
    const isDirectory = line.startsWith("dir");
    if (isDirectory) {
      const directoryName = line.replace("dir ", "");

      currentPath.reduce((acc, cur) => {
        if (!acc[cur]) {
          acc[cur] = {};
        }
        return acc[cur];
      }, directoryStructure)[directoryName] = { type: "dir" };

      return;
    }
    const [fileSize, fileName] = line.split(" ");
    currentPath.reduce((acc, cur) => {
      if (!acc[cur]) {
        acc[cur] = {};
      }
      return acc[cur];
    }, directoryStructure)[fileName] = {
      fileName,
      fileSize: parseInt(fileSize),
    };
  });

  function calculateSize(dir) {
    let totalSize = 0;
    Object.keys(dir).forEach((key) => {
      const item = dir[key];
      if (item.type === "dir" || key === "/") {
        totalSize += calculateSize(item);
      } else {
        totalSize += item.fileSize || 0;
      }
    });
    return totalSize;
  }

  let arrayOfDirs = [];

  function calculateDirectorySizes(dir) {
    Object.keys(dir).forEach((key) => {
      const item = dir[key];
      if (item.type === "dir" || key === "/") {
        item.size = calculateSize(item);
        arrayOfDirs = [...arrayOfDirs, { name: key, size: item.size }];
        calculateDirectorySizes(item);
      }
    });
    return dir;
  }

  const dirWithSizes = calculateDirectorySizes(directoryStructure);

  function findDirectoriesLessThan(dir, size) {
    const directories = [];
    Object.keys(dir).forEach((key) => {
      const item = dir[key];
      if (item.type === "dir" || key === "/") {
        if (item.size <= size) {
          directories.push(item.size);
        }
        directories.push(...findDirectoriesLessThan(item, size));
      }
    });
    return directories;
  }

  const part1 = findDirectoriesLessThan(dirWithSizes, 100000).reduce(sum, 0);

  const sortedDirs = arrayOfDirs.sort((a, b) => b.size - a.size);
  const differenceThatNeedsSubtracting = sortedDirs[0].size - 40000000;
  const dirThatNeedsDeleting = sortedDirs
    .filter(({ size }) => size >= differenceThatNeedsSubtracting)
    .at(-1);

  const part2 = dirThatNeedsDeleting.size;

  return {
    part1,
    part2,
  };
}

export function day7() {
  // Cached results as it can be expensive to run all the challenges at once. Used to present on the UI
  return {
    ...(EXECUTE_ALL_CHALLENGES
      ? runChallenge()
      : {
          part1: 1348005,
          part2: 12785886,
        }),
    time: 88,
    hasGo: false,
  };
}
