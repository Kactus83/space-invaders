import { WallType } from "../../../entities/wall/WallType";
import { DefenseLineConfig } from "../types/DefenseLineConfig";

export const defenseLineConfigurations: DefenseLineConfig[] = [
  {
    level: 1,
    lines: [
      { blocks: [
        { type: WallType.Basic}, 
        { type: WallType.None}, 
        { type: WallType.Basic}, 
        { type: WallType.None}, 
        { type: WallType.Strong}, 
        { type: WallType.Strong}, 
        { type: WallType.None}, 
        { type: WallType.Basic}, 
        { type: WallType.None}, 
        { type: WallType.Basic}
      ] }, 
    ]
  },
];
