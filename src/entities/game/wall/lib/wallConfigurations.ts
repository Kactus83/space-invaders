import { WallType } from "../WallType";

interface MiniPatterns {
  [key: string]: number[][];
}

const miniPatterns: MiniPatterns = {
  empty: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  basic: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
  strong: [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]],
};

export const wallTypeMapping: { [key: number]: WallType } = {
  0: WallType.None,
  1: WallType.Basic,
  2: WallType.Strong,
};

// Configurations de vagues pour les murs
export const wallWaveConfigurations = {
  wave1: ["basic", "empty", "strong", "empty", "basic","basic", "empty", "strong", "empty", "basic","basic", "empty", "strong", "empty", "basic","basic", "empty", "strong", "empty", "basic"],
  wave2: ["empty", "empty", "empty", "empty", "strong","strong", "basic", "empty", "basic", "strong","strong", "basic", "empty", "basic", "strong","strong", "empty", "empty", "empty", "empty"],
};

// Fonction pour assembler les mini-patterns en une configuration de vague complète
export function assembleWallPattern(waveKey: string): number[][] {
  const patternKeys = (wallWaveConfigurations as { [key: string]: string[] })[waveKey] || [];
  let wavePattern: number[][] = [];

  patternKeys.forEach(key => {
    const miniPattern = miniPatterns[key];
    miniPattern.forEach((row, rowIndex) => {
      if (!wavePattern[rowIndex]) {
        wavePattern[rowIndex] = [];
      }
      row.forEach(typeIndex => {
        wavePattern[rowIndex].push(...miniPattern[rowIndex]);
      });
    });
  });

  return wavePattern;
}
