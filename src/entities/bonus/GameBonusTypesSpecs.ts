import { AppConfig } from "../../core/config/AppConfig";
import { SystemBonusEffectType } from "../models/bonus-system/system-bonus/SystemBonusEffectType";
import { ExperienceBonus } from "../models/experience-system/bonus/ExperienceBonus";
import { ExperienceBonusEffect } from "../models/experience-system/bonus/ExperienceBonusEffect";
import { HealthBonus } from "../models/health-system/bonus/HealthBonus";
import { HealthBonusEffect } from "../models/health-system/bonus/HealthBonusEffect";
import { SpeedBonus } from "../models/speed-system/bonus/SpeedBonus";
import { SpeedBonusEffect } from "../models/speed-system/bonus/SpeedBonusEffect";
import { WeaponBonus } from "../models/weapon-system/bonus/WeaponBonus";
import { WeaponBonusEffect } from "../models/weapon-system/bonus/WeaponBonusEffect";
import { ProjectileType } from "../projectile/ProjectileType";
import { GameBonusType } from "./GameBonusTypes";
import { IGameBonusCharacteristics } from "./IGameBonusCharacteristics";


export const GameBonusSpecs: Record<GameBonusType, IGameBonusCharacteristics> = {
    [GameBonusType.Health_Double_Shield_30sec]: {
        systemBonus: new HealthBonus(new HealthBonusEffect("Double Shield 30sec", 30, 1, 0, 2, 0, 1, 0, 1, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Health_Increase_5_Shield_60sec]: {
        systemBonus: new HealthBonus(new HealthBonusEffect("+5 Shield 60sec", 60, 1, 0, 1, 5, 1, 0, 1, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Weapon_Double_FireRate_30sec]: {
        systemBonus: new WeaponBonus(new WeaponBonusEffect("Double FireRate 30sec", 30, 0, 2, 0, 0, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Weapon_Increase_2_FireRate_60sec]: {
        systemBonus: new WeaponBonus(new WeaponBonusEffect("+2 FireRate 60sec", 60, 2, 1, 0, 0, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    }, 
    [GameBonusType.Speed_Double_Speed_30sec]: {
        systemBonus: new SpeedBonus(new SpeedBonusEffect("Double Speed 30sec", 30, 2, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Speed_Increase_5_Speed_60sec]: {
        systemBonus: new SpeedBonus(new SpeedBonusEffect("+5 Speed 60sec", 60, 1, 5)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Experience_Increase_1_Level]: {
        systemBonus: new ExperienceBonus(new ExperienceBonusEffect("Increase 1 Level", 0, SystemBonusEffectType.Additive, 0, 0, 1)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Experience_Double_Score_60sec]: {
        systemBonus: new ExperienceBonus(new ExperienceBonusEffect("Double Score 60sec", 60, SystemBonusEffectType.Multiplicative, 1, 0, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
};