import { ProjectileType } from "../../../projectile/ProjectileType";
import { BonusEffectType } from "../../bonus-system/BonusEffectType";
import { IBonusEffect } from "../../bonus-system/IBonusEffect";
import { IWeaponCharacteristics } from "../IWeaponCharacteristics";

export class WeaponBonusEffect implements IBonusEffect, IWeaponCharacteristics {
    duration: number;
    effectType: BonusEffectType;
    damage: number;
    fireRate: number;
    range: number;
    projectileType: ProjectileType; 
    shootProbability: number;
    
    constructor(
        duration: number,
        effectType: BonusEffectType,
        damage: number,
        fireRate: number,
        range: number,
        projectileType: ProjectileType,
        shootProbability: number,
    ) {
        this.duration = duration;
        this.effectType = effectType;
        this.damage = damage;
        this.fireRate = fireRate;
        this.range = range;
        this.projectileType = projectileType;
        this.shootProbability = shootProbability;
    }
}