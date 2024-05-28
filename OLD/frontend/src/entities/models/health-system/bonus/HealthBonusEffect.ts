import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { IHealthCharacteristics } from "../IHealthCharasteristics";
import { GameBonusType } from "../../../bonus/GameBonusTypes";

export class HealthBonusEffect implements ISystemBonusEffect {
    name: GameBonusType;
    casualName: string;
    duration: number; 
    multiplicator_Hp: number;
    additional_Hp: number;
    multiplicator_Shield: number;
    additional_Shield: number;
    multiplicator_Damage: number;
    additional_Damage: number;
    multiplicator_RegenerationRate: number;
    additional_RegenerationRate: number;

    constructor(
        name: GameBonusType,
        casualName: string,
        duration: number,
        multiplicator_Hp: number,
        additional_Hp: number,
        multiplicator_Shield: number,
        additional_Shield: number,
        multiplicator_Damage: number,
        additional_Damage: number,
        multiplicator_RegenerationRate: number,
        additional_RegenerationRate: number,
    ) {
        this.name = name;
        this.casualName = casualName;
        this.duration = duration;
        this.multiplicator_Hp = multiplicator_Hp;
        this.additional_Hp = additional_Hp;
        this.multiplicator_Shield = multiplicator_Shield;
        this.additional_Shield = additional_Shield;
        this.multiplicator_Damage = multiplicator_Damage;
        this.additional_Damage = additional_Damage;
        this.multiplicator_RegenerationRate = multiplicator_RegenerationRate;
        this.additional_RegenerationRate = additional_RegenerationRate;
    }
}