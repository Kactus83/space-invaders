import { AppConfig } from "../../core/config/AppConfig";
import { BonusEffectType } from "../models/bonus-system/BonusEffectType";
import { HealthBonus } from "../models/health-system/bonus/HealthBonus";
import { HealthBonusEffect } from "../models/health-system/bonus/HealthBonusEffect";
import { SpeedBonus } from "../models/speed-system/bonus/SpeedBonus";
import { SpeedBonusEffect } from "../models/speed-system/bonus/SpeedBonusEffect";
import { WeaponBonus } from "../models/weapon-system/bonus/WeaponBonus";
import { WeaponBonusEffect } from "../models/weapon-system/bonus/WeaponBonusEffect";
import { ProjectileType } from "../projectile/ProjectileType";
import { GameBonusType } from "./GameBonusTypeS";
import { IGameBonusCharacteristics } from "./IGameBonusCharacteristics";


export const GameBonusSpecs: Record<GameBonusType, IGameBonusCharacteristics> = {
    [GameBonusType.Health_Double_Shield_30sec]: {
        bonus: new HealthBonus(new HealthBonusEffect(30, BonusEffectType.Multiplicative, 1, 2, 1, 1)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Health_Increase_5_Shield_60sec]: {
        bonus: new HealthBonus(new HealthBonusEffect(60, BonusEffectType.Additive, 0, 5, 0, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Weapon_Double_FireRate_30sec]: {
        bonus: new WeaponBonus(new WeaponBonusEffect(30, BonusEffectType.Multiplicative, 2, ProjectileType.None, 1)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Weapon_Increase_2_FireRate_60sec]: {
        bonus: new WeaponBonus(new WeaponBonusEffect(60, BonusEffectType.Additive, 2, ProjectileType.None, 0)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    }, 
    [GameBonusType.Speed_Double_Speed_30sec]: {
        bonus: new SpeedBonus(new SpeedBonusEffect(30, BonusEffectType.Multiplicative, 2)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
    [GameBonusType.Speed_Increase_5_Speed_60sec]: {
        bonus: new SpeedBonus(new SpeedBonusEffect(60, BonusEffectType.Additive, 5)),
        moveSpeed: AppConfig.getInstance().bonusBaseSpeed,
    },
};