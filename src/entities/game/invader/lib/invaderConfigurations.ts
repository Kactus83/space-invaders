import { InvaderType } from "../InvaderType";

interface WavePattern {
  [key: string]: (InvaderType)[][];
}

// Définition des mini-patterns avec le type 'None' pour les espaces vides
const miniPatterns: WavePattern = {
  empty: [
    [InvaderType.None, InvaderType.None],
    [InvaderType.None, InvaderType.None]
  ],
  light: [
    [InvaderType.Light, InvaderType.Light],
    [InvaderType.Light, InvaderType.Light]
  ],
  basic: [
    [InvaderType.Basic, InvaderType.Basic],
    [InvaderType.Basic, InvaderType.Basic]
  ],
  strong: [
    [InvaderType.Strong, InvaderType.Strong],
    [InvaderType.Strong, InvaderType.Strong]
  ],
  advanced: [
    [InvaderType.Advanced, InvaderType.Advanced],
    [InvaderType.Advanced, InvaderType.Advanced]
  ],
  elite: [
    [InvaderType.Elite, InvaderType.Elite],
    [InvaderType.Elite, InvaderType.Elite]
  ],
  boss: [
    [InvaderType.Elite, InvaderType.Elite],
    [InvaderType.Boss, InvaderType.Elite]
  ],
  strongMix: [
    [InvaderType.Strong, InvaderType.Elite],
    [InvaderType.Strong, InvaderType.Advanced]
  ],
  // Ajoutez d'autres mini-patterns selon vos besoins
};

// Configuration de vagues d'invaders qui utilisent les mini-patterns
export const waveConfigurations = {
  wave1: [
    "light", "basic", "strongMix", "light", "basic",
    // Répéter ou modifier pour créer une configuration complète de la vague
  ],
  wave2: [
    "strongMix", "strong", "advanced", "elite", "light",
    // Définir une configuration pour la vague 2
  ],
  // Ajouter d'autres vagues au besoin
};

// Fonction pour assembler les mini-patterns en une configuration de vague complète
export function assembleWavePattern(waveKey: string): InvaderType[][] {
  const patternKeys = waveConfigurations[waveKey as keyof typeof waveConfigurations] || [];
  let wavePattern: InvaderType[][] = [];

  patternKeys.forEach((key) => {
    const miniPattern = miniPatterns[key];
    miniPattern.forEach((row, rowIndex) => {
      if (!wavePattern[rowIndex]) {
        wavePattern[rowIndex] = [];
      }
      wavePattern[rowIndex].push(...row);
    });
  });

  return wavePattern;
}
