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
    {
        requiredBonuses: [GameBonusType.Weapon_Double_FireRate_5sec, GameBonusType.Weapon_Double_FireRate_5sec, GameBonusType.Weapon_Double_FireRate_5sec],
        resultBonus: GameBonusType.Weapon_Double_Firerate_10sec,
    },
    {
        requiredBonuses: [GameBonusType.Weapon_Double_Firerate_10sec, GameBonusType.Weapon_Double_Firerate_10sec, GameBonusType.Weapon_Double_Firerate_10sec],
        resultBonus: GameBonusType.Weapon_Double_Firerate_20sec,
    },
    {
        requiredBonuses: [GameBonusType.Weapon_Double_Firerate_20sec, GameBonusType.Weapon_Double_Firerate_20sec, GameBonusType.Weapon_Double_Firerate_20sec],
        resultBonus: GameBonusType.Weapon_Double_Firerate_30sec,
    },
    {
        requiredBonuses: [GameBonusType.Speed_Double_Speed_30sec, GameBonusType.Speed_Double_Speed_30sec, GameBonusType.Speed_Double_Speed_30sec],
        resultBonus: GameBonusType.Speed_Tripple_Speed_30sec,
    },
    {
        requiredBonuses: [GameBonusType.Speed_Tripple_Speed_30sec, GameBonusType.Speed_Tripple_Speed_30sec, GameBonusType.Speed_Tripple_Speed_30sec],
        resultBonus: GameBonusType.Speed_Increase_5_Speed_60sec,
    },
    {
        requiredBonuses: [GameBonusType.Speed_Increase_5_Speed_60sec, GameBonusType.Speed_Increase_5_Speed_60sec, GameBonusType.Speed_Increase_5_Speed_60sec],
        resultBonus: GameBonusType.Speed_Increase_10_Speed_60sec,
    },
    {
        requiredBonuses: [GameBonusType.Speed_Increase_10_Speed_60sec, GameBonusType.Speed_Increase_10_Speed_60sec, GameBonusType.Speed_Increase_10_Speed_60sec],
        resultBonus: GameBonusType.Speed_Increase_20_Speed_60sec,
    },
    {
        requiredBonuses: [GameBonusType.Experience_Increase_500_Score, GameBonusType.Experience_Increase_500_Score, GameBonusType.Experience_Increase_500_Score],
        resultBonus: GameBonusType.Experience_Increase_1000_Score,
    },
];
