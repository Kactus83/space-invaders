import { GameBonusType } from "../../../entities/bonus/GameBonusTypes";

export interface CraftRecipe {
    requiredBonuses: GameBonusType[];
    resultBonus: GameBonusType;
}
