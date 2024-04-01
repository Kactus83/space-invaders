import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { ISpeedCharacteristics } from "../ISpeedCharacteristics";

export class SpeedBonusEffect implements ISystemBonusEffect, ISpeedCharacteristics {
    duration: number;
    effectType: SystemBonusEffectType;
    moveSpeed: number;

    constructor(
        duration: number,
        effectType: SystemBonusEffectType,
        moveSpeed: number,
    ) {
        this.duration = duration;
        this.effectType = effectType;
        this.moveSpeed = moveSpeed;
    }
}