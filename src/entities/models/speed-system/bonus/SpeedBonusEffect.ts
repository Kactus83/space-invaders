import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { ISpeedCharacteristics } from "../ISpeedCharacteristics";
import { GameBonusType } from "../../../bonus/GameBonusTypes";

export class SpeedBonusEffect implements ISystemBonusEffect { 
    name: GameBonusType;
    casualName: string;
    duration: number;
    multiplicator_MoveSpeed: number;
    additional_MoveSpeed: number;

    constructor(
        name: GameBonusType,
        casualName: string,
        duration: number,
        multiplicator_MoveSpeed: number,
        additional_MoveSpeed: number,
    ) {
        this.name = name;
        this.casualName = casualName;
        this.duration = duration;
        this.multiplicator_MoveSpeed = multiplicator_MoveSpeed;
        this.additional_MoveSpeed = additional_MoveSpeed;
    }
}