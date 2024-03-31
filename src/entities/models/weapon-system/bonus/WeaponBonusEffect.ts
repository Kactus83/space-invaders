import { ProjectileType } from "../../../projectile/ProjectileType";
import { BonusEffectType } from "../../bonus-system/BonusEffectType";
import { IBonusEffect } from "../../bonus-system/IBonusEffect";
import { IWeaponCharacteristics } from "../IWeaponCharacteristics";

export class WeaponBonusEffect implements IBonusEffect, IWeaponCharacteristics {
    duration: number;
    effectType: BonusEffectType;
    projectileType: ProjectileType;
    fireRate: number;
    shootProbability: number;
    
    constructor(
        duration: number,
        effectType: BonusEffectType,
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