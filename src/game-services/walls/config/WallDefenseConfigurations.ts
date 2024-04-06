import { WallType } from "../../../entities/wall/WallType";
import { DefenseLineConfig } from "../types/DefenseLineConfig";

export const defenseLineConfigurations: DefenseLineConfig[] = [
  {
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
        { type: WallType.Basic}, 
        { type: WallType.Basic},
        { type: WallType.Basic}, 
        { type: WallType.Basic}, 
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
];
