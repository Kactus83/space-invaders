import { GameBonusType } from "../../../../entities/bonus/GameBonusTypes";
import { GameBonusDesign } from "../../../models/GameBonusDesign";

export const gameBonusDesigns: Record<GameBonusType, GameBonusDesign> = {
    [GameBonusType.Health_Double_Shield_30sec]: new GameBonusDesign(GameBonusType.Health_Double_Shield_30sec, "assets/themes/default/bonus/health_double_shield_30sec.svg", 20, 20),
    [GameBonusType.Health_Increase_5_Shield_60sec]: new GameBonusDesign(GameBonusType.Health_Increase_5_Shield_60sec, "assets/themes/default/bonus/health_increase_5_shield_60sec.svg", 20, 20),
    [GameBonusType.Weapon_Double_FireRate_30sec]: new GameBonusDesign(GameBonusType.Weapon_Double_FireRate_30sec, "assets/themes/default/bonus/weapon_double_fire_rate_30sec.svg", 20, 20),
    [GameBonusType.Weapon_Increase_2_FireRate_60sec]: new GameBonusDesign(GameBonusType.Weapon_Increase_2_FireRate_60sec, "assets/themes/default/bonus/weapon_increase_2_fire_rate_60sec.svg", 20, 20),
    [GameBonusType.Speed_Double_Speed_30sec]: new GameBonusDesign(GameBonusType.Speed_Double_Speed_30sec, "assets/themes/default/bonus/speed_double_speed_30sec.svg", 20, 20),
    [GameBonusType.Speed_Increase_5_Speed_60sec]: new GameBonusDesign(GameBonusType.Speed_Increase_5_Speed_60sec, "assets/themes/default/bonus/speed_increase_5_speed_60sec.svg", 20, 20),
};