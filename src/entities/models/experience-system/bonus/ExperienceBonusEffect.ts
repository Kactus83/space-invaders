import { GameBonusType } from "../../../bonus/GameBonusTypes";
import { ProjectileType } from "../../../projectile/ProjectileType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { IExperienceSystemCharacteristics } from "../types/IExperienceSystemCharacteristics";

export class ExperienceBonusEffect implements ISystemBonusEffect {
    name: GameBonusType;
    duration: number;
    additional_Score: number;
    multiplicator_Score: number;
    additional_LifeBonus: number;
    upgrade_Level: number;
    
    constructor(name: GameBonusType, duration: number, additional_Score: number, multiplicator_Score: number, additional_LifeBonus: number, upgrade_Level: number) {
        this.name = name;
        this.duration = duration;
        this.additional_Score = additional_Score;
        this.multiplicator_Score = multiplicator_Score;
        this.additional_LifeBonus = additional_LifeBonus;
        this.upgrade_Level = upgrade_Level;
    }
}