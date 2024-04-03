import { ProjectileType } from "../../../projectile/ProjectileType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { IExperienceSystemCharacteristics } from "../IExperienceSystemCharacteristics";

export class ExperienceBonusEffect implements ISystemBonusEffect, IExperienceSystemCharacteristics {
    name: string;
    duration: number;
    additional_Score: number;
    multiplicator_Score: number;
    additional_LifeBonus: number;
    upgrade_Level: number;
    level: number = 0;
    scoreThreshold: number = 0;
    lifeBonus: number = 0;
    hp: number = 0;
    shield: number = 0;
    damage: number = 0;
    regenerationRate: number = 0;
    projectileType: ProjectileType = ProjectileType.None;
    fireRate: number = 0;
    shootProbability: number = 0;
    moveSpeed: number = 0; 
    
    constructor(name: string, duration: number, additional_Score: number, multiplicator_Score: number, additional_LifeBonus: number, upgrade_Level: number) {
        this.name = name;
        this.duration = duration;
        this.additional_Score = additional_Score;
        this.multiplicator_Score = multiplicator_Score;
        this.additional_LifeBonus = additional_LifeBonus;
        this.upgrade_Level = upgrade_Level;
    }
}