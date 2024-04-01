import { SystemBonusEffectType } from "../../bonus-system/system-bonus/SystemBonusEffectType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
import { IHealthCharacteristics } from "../IHealthCharasteristics";

export class HealthBonusEffect implements ISystemBonusEffect, IHealthCharacteristics {
    duration: number; 
    effectType: SystemBonusEffectType;
    hp: number;
    shield: number;
    damage: number;
    regenerationRate: number;

    constructor(
        duration: number,
        effectType: SystemBonusEffectType,
        hp: number,
        shield: number,
        damage: number,
        regenerationRate: number,
    ) {
        this.duration = duration;
        this.effectType = effectType;
        this.hp = hp;
        this.shield = shield;
        this.damage = damage;
        this.regenerationRate = regenerationRate;
    }
}