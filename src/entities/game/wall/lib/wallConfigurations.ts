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
  wave1: ["basic", "basic", "empty", "empty", "empty", "basic", "empty", "empty", "strong", "strong", "strong", "strong", "empty", "empty", "basic", "empty", "empty", "empty", "basic", "basic"],
  wave2: ["basic", "basic", "empty", "empty", "empty", "basic", "empty", "empty", "strong", "empty", "empty", "strong", "empty", "empty", "basic", "empty", "empty", "empty", "basic", "basic"],
  wave3: ["strong", "empty", "empty", "empty", "empty", "basic", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "basic", "empty", "empty", "empty", "empty", "strong"],
  wave4: ["empty", "empty", "empty", "empty", "empty", "basic", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "basic", "empty", "empty", "empty", "empty", "empty"],
  wave5: ["empty", "empty", "empty", "empty", "empty", "strong", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "strong", "empty", "empty", "empty", "empty", "empty"],
};

// Fonction pour assembler les mini-patterns en une configuration de vague complète
export function assembleWallPattern(waveKey: string): number[][] {
  const patternKeys = wallWaveConfigurations[waveKey as keyof typeof wallWaveConfigurations] || [];
  let wavePattern: number[][] = [];

  // Pour chaque ligne du mini-pattern (en assumant une hauteur uniforme pour tous)
  for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
    wavePattern[rowIndex] = [];
    
    // Pour chaque mini-pattern spécifié dans la configuration de la vague
    patternKeys.forEach(key => {
      // Trouver le mini-pattern correspondant
      const miniPattern = miniPatterns[key];
      
      // Ajouter la ligne courante du mini-pattern à la ligne courante de wavePattern
      wavePattern[rowIndex] = wavePattern[rowIndex].concat(miniPattern[rowIndex]);
    });
  }

  return wavePattern;
}

