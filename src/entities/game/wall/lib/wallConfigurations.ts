import { WallType } from "../WallType";

interface MiniPatterns {
  [key: string]: number[][];
}

const miniPatterns: MiniPatterns = {
  empty: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  basic: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
  strong: [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]],
};

export const wallTypeMapping: { [key: string]: WallType } = {
  "0": WallType.None,
  "1": WallType.Basic,
  "2": WallType.Strong,
};

export const level1Pattern = generateLevelPattern(["basic", "empty", "strong", "empty", "basic","basic", "empty", "strong", "empty", "basic","basic", "empty", "strong", "empty", "basic","basic", "empty", "strong", "empty", "basic"]);
export const level2Pattern = generateLevelPattern(["basic", "empty", "empty", "empty", "basic","basic", "empty", "strong", "empty", "basic","basic", "empty", "strong", "empty", "basic","basic", "empty", "empty", "empty", "basic"]);

async function generateLevelPattern(patternKeys: string[]): Promise<number[][]> {
  let pattern: number[][] = [];
  patternKeys.forEach((miniPatternKey) => {
    const miniPattern = miniPatterns[miniPatternKey];
    miniPattern.forEach((row, rowIndex) => {
      if (!pattern[rowIndex]) {
        pattern[rowIndex] = [];
      }
      pattern[rowIndex] = [...pattern[rowIndex], ...row];
    });
  });
  return pattern;
}
