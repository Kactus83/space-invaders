import { GameBonusType } from "../../../../entities/bonus/GameBonusTypes";
import { GameBonusDesign } from "../../../models/GameBonusDesign";

export const gameBonusDesigns: Record<GameBonusType, GameBonusDesign> = {
    [GameBonusType.Health_Double_Shield_30sec]: new GameBonusDesign(GameBonusType.Health_Double_Shield_30sec, "assets/themes/default/bonus/health_double_shield_30sec.svg", 20, 20),
    [GameBonusType.Health_Increase_1_Shield_60sec]: new GameBonusDesign(GameBonusType.Health_Increase_1_Shield_60sec, "assets/themes/default/bonus/health_increase_1_shield_60sec.svg", 20, 20),
    [GameBonusType.Health_Increase_2_Shield_60sec]: new GameBonusDesign(GameBonusType.Health_Increase_2_Shield_60sec, "assets/themes/default/bonus/health_increase_2_shield_60sec.svg", 20, 20),
    [GameBonusType.Health_Increase_5_Shield_60sec]: new GameBonusDesign(GameBonusType.Health_Increase_5_Shield_60sec, "assets/themes/default/bonus/health_increase_5_shield_60sec.svg", 20, 20),
    [GameBonusType.Weapon_Double_FireRate_5sec]: new GameBonusDesign(GameBonusType.Weapon_Double_FireRate_5sec, "assets/themes/default/bonus/weapon_double_fire_rate_5sec.svg", 20, 20),
    [GameBonusType.Weapon_Double_Firerate_10sec]: new GameBonusDesign(GameBonusType.Weapon_Double_Firerate_10sec, "assets/themes/default/bonus/weapon_double_firerate_10sec.svg", 20, 20),
    [GameBonusType.Weapon_Double_Firerate_20sec]: new GameBonusDesign(GameBonusType.Weapon_Double_Firerate_20sec, "assets/themes/default/bonus/weapon_double_firerate_20sec.svg", 20, 20),
    [GameBonusType.Weapon_Double_Firerate_30sec]: new GameBonusDesign(GameBonusType.Weapon_Double_Firerate_30sec, "assets/themes/default/bonus/weapon_double_firerate_30sec.svg", 20, 20),
    [GameBonusType.Weapon_Increase_05_FireRate_60sec]: new GameBonusDesign(GameBonusType.Weapon_Increase_05_FireRate_60sec, "assets/themes/default/bonus/weapon_increase_05_fire_rate_60sec.svg", 20, 20),
    [GameBonusType.Weapon_Increase_1_FireRate_60sec]: new GameBonusDesign(GameBonusType.Weapon_Increase_1_FireRate_60sec, "assets/themes/default/bonus/weapon_increase_1_fire_rate_60sec.svg", 20, 20),
    [GameBonusType.Weapon_Increase_15_FireRate_60sec]: new GameBonusDesign(GameBonusType.Weapon_Increase_15_FireRate_60sec, "assets/themes/default/bonus/weapon_increase_15_fire_rate_60sec.svg", 20, 20),
    [GameBonusType.Speed_Double_Speed_30sec]: new GameBonusDesign(GameBonusType.Speed_Double_Speed_30sec, "assets/themes/default/bonus/speed_double_speed_30sec.svg", 20, 20),
    [GameBonusType.Speed_Tripple_Speed_30sec]: new GameBonusDesign(GameBonusType.Speed_Tripple_Speed_30sec, "assets/themes/default/bonus/speed_tripple_speed_30sec.svg", 20, 20),
    [GameBonusType.Speed_Increase_5_Speed_60sec]: new GameBonusDesign(GameBonusType.Speed_Increase_5_Speed_60sec, "assets/themes/default/bonus/speed_increase_5_speed_60sec.svg", 20, 20),
    [GameBonusType.Speed_Increase_10_Speed_60sec]: new GameBonusDesign(GameBonusType.Speed_Increase_10_Speed_60sec, "assets/themes/default/bonus/speed_increase_10_speed_60sec.svg", 20, 20),
    [GameBonusType.Speed_Increase_20_Speed_60sec]: new GameBonusDesign(GameBonusType.Speed_Increase_20_Speed_60sec, "assets/themes/default/bonus/speed_increase_20_speed_60sec.svg", 20, 20),
    [GameBonusType.Experience_Increase_500_Score]: new GameBonusDesign(GameBonusType.Experience_Increase_500_Score, "assets/themes/default/bonus/experience_increase_500_score.svg", 20, 20),
    [GameBonusType.Experience_Increase_1000_Score]: new GameBonusDesign(GameBonusType.Experience_Increase_1000_Score, "assets/themes/default/bonus/experience_increase_1000_score.svg", 20, 20),
    [GameBonusType.Experience_Increase_1_Level]: new GameBonusDesign(GameBonusType.Experience_Increase_1_Level, "assets/themes/default/bonus/experience_increase_1_level.svg", 20, 20),
    [GameBonusType.Experience_Double_Score_60sec]: new GameBonusDesign(GameBonusType.Experience_Double_Score_60sec, "assets/themes/default/bonus/experience_double_score_60sec.svg", 20, 20),
};