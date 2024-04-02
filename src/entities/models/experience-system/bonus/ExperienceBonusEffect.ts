import { ProjectileType } from "../../../projectile/ProjectileType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { IExperienceSystemCharacteristics } from "../IExperienceSystemCharacteristics";

export class ExperienceBonusEffect implements ISystemBonusEffect, IExperienceSystemCharacteristics {
    name: string;
    duration: number;
    effectType: SystemBonusEffectType;
    scoreThreshold: number;
    lifeBonus: number;
    level: number;
    hp: number;
    shield: number;
    damage: number;
    regenerationRate: number;
    projectileType: ProjectileType;
    fireRate: number;
    shootProbability: number;
    moveSpeed: number; 
    
    constructor(name: string, duration: number, effectType: SystemBonusEffectType, scoreThreshold: number, lifeBonus: number, level: number, hp: number, shield: number, damage: number, regenerationRate: number, projectileType: ProjectileType, fireRate: number, shootProbability: number, moveSpeed: number) {
        this.name = name;
        this.duration = duration;
        this.effectType = effectType;
        this.scoreThreshold = scoreThreshold;
        this.lifeBonus = lifeBonus;
        this.level = level;
        this.hp = hp;
        this.shield = shield;
        this.damage = damage;
        this.regenerationRate = regenerationRate;
        this.projectileType = projectileType;
        this.fireRate = fireRate;
        this.shootProbability = shootProbability;
        this.moveSpeed = moveSpeed;
    }
}