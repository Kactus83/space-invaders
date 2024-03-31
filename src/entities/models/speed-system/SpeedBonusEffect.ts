import { BonusEffectType } from "../bonus-system/BonusEffectType";
import { IBonusEffect } from "../bonus-system/IBonusEffect";
import { ISpeedCharacteristics } from "./ISpeedCharacteristics";

export class SpeedBonusEffect implements IBonusEffect, ISpeedCharacteristics {
    duration: number;
    effectType: BonusEffectType;
    moveSpeed: number;

    constructor(
        duration: number,
        effectType: BonusEffectType,
        moveSpeed: number,
    ) {
        this.duration = duration;
        this.effectType = effectType;
        this.moveSpeed = moveSpeed;
    }
}