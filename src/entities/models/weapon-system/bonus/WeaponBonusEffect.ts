import { ProjectileType } from "../../../projectile/ProjectileType";
import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { IWeaponCharacteristics } from "../IWeaponCharacteristics";

export class WeaponBonusEffect implements ISystemBonusEffect, IWeaponCharacteristics {
    name: string;
    duration: number;
    effectType: SystemBonusEffectType;
    projectileType: ProjectileType;
    fireRate: number;
    shootProbability: number;
    
    constructor(
        name: string,
        duration: number,
        effectType: SystemBonusEffectType,
        fireRate: number,
        projectileType: ProjectileType,
        shootProbability: number,
    ) {
        this.name = name;
        this.duration = duration;
        this.effectType = effectType;
        this.fireRate = fireRate;
        this.projectileType = projectileType;
        this.shootProbability = shootProbability;
    }
}