import { GameBonusType } from "../../../bonus/GameBonusTypes";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";

export class SkillBonusEffect implements ISystemBonusEffect {
    name: GameBonusType;
    duration: number;
    multiplicator_CooldownRatio: number;
    additional_CooldownRatio: number;

    constructor(name: GameBonusType, duration: number, multiplicator_CooldownRatio: number, additional_CooldownRatio: number) {
        this.name = name;
        this.duration = duration;
        this.multiplicator_CooldownRatio = multiplicator_CooldownRatio;
        this.additional_CooldownRatio = additional_CooldownRatio;
    }
}