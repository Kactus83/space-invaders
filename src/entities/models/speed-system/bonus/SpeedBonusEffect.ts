import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { ISpeedCharacteristics } from "../ISpeedCharacteristics";

export class SpeedBonusEffect implements ISystemBonusEffect, ISpeedCharacteristics { 
    name: string;
    duration: number;
    effectType: SystemBonusEffectType;
    moveSpeed: number;

    constructor(
        name: string,
        duration: number,
        effectType: SystemBonusEffectType,
        moveSpeed: number,
    ) {
        this.name = name;
        this.duration = duration;
        this.effectType = effectType;
        this.moveSpeed = moveSpeed;
    }
}