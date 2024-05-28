import { WallType } from "../../../entities/wall/WallType";
import { DefenseLineConfig } from "../types/DefenseLineConfig";
import { LevelConfiguration } from "../types/LevelConfiguration";

export const defenseLineConfigurations: Record<number, LevelConfiguration> = {
  1: {
    experienceCost: 0, // Coût en expérience pour atteindre ce niveau
    defenseConfig: {
      level: 1,
      lines: [
        { blocks: [
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Light}, 
          { type: WallType.Basic},
          { type: WallType.Basic}, 
          { type: WallType.Light}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}
        ] }, 
        { blocks: [
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Light}, 
          { type: WallType.Light},
          { type: WallType.Light}, 
          { type: WallType.Light}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}
        ] }, 
      ],
    },
  },
  2: {
    experienceCost: 500, // Coût en expérience pour atteindre ce niveau
    defenseConfig: {
      level: 1,
      lines: [
        { blocks: [
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic},
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}
        ] }, 
        { blocks: [
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Light}, 
          { type: WallType.Basic},
          { type: WallType.Basic}, 
          { type: WallType.Light}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}
        ] }, 
      ],
    },
  },
  3: {
    experienceCost: 1000, // Coût en expérience pour atteindre ce niveau
    defenseConfig: {
      level: 2,
      lines: [
        { blocks: [
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic},
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}
        ] }, 
        { blocks: [
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic},
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}
        ] }, 
      ],
    },
  },
  4: {
    experienceCost: 2500, // Coût en expérience pour atteindre ce niveau
    defenseConfig: {
      level: 3,
      lines: [
        { blocks: [
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Strong},
          { type: WallType.Strong}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}
        ] }, 
        { blocks: [
          { type: WallType.Light}, 
          { type: WallType.Light}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic},
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.Light}, 
          { type: WallType.Light}
        ] }, 
      ],
    },
  },
  5: {
    experienceCost: 5000, // Coût en expérience pour atteindre ce niveau
    defenseConfig: {
      level: 4,
      lines: [
        { blocks: [
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong},
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}
        ] }, 
        { blocks: [
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong},
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}
        ] }, 
      ],
    },
  },
  6: {
    experienceCost: 10000, // Coût en expérience pour atteindre ce niveau
    defenseConfig: {
      level: 5,
      lines: [
        { blocks: [
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong},
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.Basic}, 
          { type: WallType.Basic}
        ] }, 
        { blocks: [
          { type: WallType.Reflective}, 
          { type: WallType.Reflective}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Strong}, 
          { type: WallType.Reflective},
          { type: WallType.Reflective}, 
          { type: WallType.Strong}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.None}, 
          { type: WallType.Strong}, 
          { type: WallType.Strong}, 
          { type: WallType.Reflective}, 
          { type: WallType.Reflective}
        ] }, 
      ],
    },
  },
  // Ajoutez d'autres niveaux ici
};