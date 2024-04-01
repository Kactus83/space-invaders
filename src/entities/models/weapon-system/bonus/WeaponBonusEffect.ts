import { ProjectileType } from "../../../projectile/ProjectileType";
import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { IWeaponCharacteristics } from "../IWeaponCharacteristics";

export class WeaponBonusEffect implements ISystemBonusEffect, IWeaponCharacteristics {
    duration: number;
    effectType: SystemBonusEffectType;
    projectileType: ProjectileType;
    fireRate: number;
    shootProbability: number;
    
    constructor(
        duration: number,
        effectType: SystemBonusEffectType,
        fireRate: number,
        projectileType: ProjectileType,
        shootProbability: number,
    ) {
        this.duration = duration;
        this.effectType = effectType;
        this.fireRate = fireRate;
        this.projectileType = projectileType;
        this.shootProbability = shootProbability;
    }
}