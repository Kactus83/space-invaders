import { GameBonusType } from "../../../bonus/GameBonusTypes";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";

export class ExperienceBonusEffect implements ISystemBonusEffect {
    name: GameBonusType;
    casualName: string;
    duration: number;
    additional_Score: number;
    multiplicator_Score: number;
    additional_LifeBonus: number;
    upgrade_Level: number;
    
    constructor(name: GameBonusType, casualName: string, duration: number, additional_Score: number, multiplicator_Score: number, additional_LifeBonus: number, upgrade_Level: number) {
        this.name = name;
        this.casualName = casualName;
        this.duration = duration;
        this.additional_Score = additional_Score;
        this.multiplicator_Score = multiplicator_Score;
        this.additional_LifeBonus = additional_LifeBonus;
        this.upgrade_Level = upgrade_Level;
    }
}