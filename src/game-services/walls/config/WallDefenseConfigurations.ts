import { WallType } from "../../../entities/wall/WallType";
import { DefenseLineConfig } from "../types/DefenseLineConfig";

export const defenseLineConfigurations: DefenseLineConfig[] = [
  {
    level: 1,
    lines: [
      { blocks: [{ type: WallType.Basic, count: 10 }] }, 
      { blocks: [{ type: WallType.Basic, count: 10 }] }  
    ]
  },
];
