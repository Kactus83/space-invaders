import { BonusEffectType } from "../bonus-system/BonusEffectType";
import { IBonusEffect } from "../bonus-system/IBonusEffect";
import { IHealthCharacteristics } from "./IHealthCharasteristics";

export class HealthBonusEffect implements IBonusEffect, IHealthCharacteristics {
    duration: number; 
    effectType: BonusEffectType;
    hp: number;
    shield: number;
    damage: number;
    regenerationRate: number;

    constructor(
        duration: number,
        effectType: BonusEffectType,
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