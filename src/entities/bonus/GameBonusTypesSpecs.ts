import { AppConfig } from "../../core/config/AppConfig";
import { SystemBonusEffectType } from "../models/bonus-system/system-bonus/SystemBonusEffectType";
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
        systemBonus: new HealthBonus(new HealthBonusEffect(30, SystemBonusEffectType.Multiplicative, 1, 2, 1, 1)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Health_Increase_5_Shield_60sec]: {
        systemBonus: new HealthBonus(new HealthBonusEffect(60, SystemBonusEffectType.Additive, 0, 5, 0, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Weapon_Double_FireRate_30sec]: {
        systemBonus: new WeaponBonus(new WeaponBonusEffect(30, SystemBonusEffectType.Multiplicative, 2, ProjectileType.None, 1)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Weapon_Increase_2_FireRate_60sec]: {
        systemBonus: new WeaponBonus(new WeaponBonusEffect(60, SystemBonusEffectType.Additive, 2, ProjectileType.None, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    }, 
    [GameBonusType.Speed_Double_Speed_30sec]: {
        systemBonus: new SpeedBonus(new SpeedBonusEffect(30, SystemBonusEffectType.Multiplicative, 2)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Speed_Increase_5_Speed_60sec]: {
        systemBonus: new SpeedBonus(new SpeedBonusEffect(60, SystemBonusEffectType.Additive, 5)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
};