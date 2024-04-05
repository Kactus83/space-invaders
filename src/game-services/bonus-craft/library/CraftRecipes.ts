import { GameBonusType } from "../../../entities/bonus/GameBonusTypes";
import { CraftRecipe } from "./CraftRecipe";

export const craftRecipes: CraftRecipe[] = [
    {
        requiredBonuses: [GameBonusType.Health_Increase_1_Shield_60sec, GameBonusType.Health_Increase_1_Shield_60sec, GameBonusType.Health_Increase_1_Shield_60sec],
        resultBonus: GameBonusType.Health_Increase_2_Shield_60sec,
    },
    {
        requiredBonuses: [GameBonusType.Health_Increase_2_Shield_60sec, GameBonusType.Health_Increase_2_Shield_60sec, GameBonusType.Health_Increase_2_Shield_60sec],
        resultBonus: GameBonusType.Health_Increase_5_Shield_60sec,
    },
    // Plus de recettes ici...
];
