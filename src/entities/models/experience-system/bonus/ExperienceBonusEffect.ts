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
    hp: number = 0;
    shield: number = 0;
    damage: number = 0;
    regenerationRate: number = 0;
    projectileType: ProjectileType = ProjectileType.None;
    fireRate: number = 0;
    shootProbability: number = 0;
    moveSpeed: number = 0; 
    
    constructor(name: string, duration: number, effectType: SystemBonusEffectType, scoreThreshold: number, lifeBonus: number, level: number) {
        this.name = name;
        this.duration = duration;
        this.effectType = effectType;
        this.scoreThreshold = scoreThreshold;
        this.lifeBonus = lifeBonus;
        this.level = level;
    }
}