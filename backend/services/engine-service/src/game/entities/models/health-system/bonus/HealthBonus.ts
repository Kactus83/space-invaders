import { SystemBonus } from "../../bonus-system/system-bonus/SystemBonus";
import { SystemBonusTypes } from "../../bonus-system/system-bonus/SystemBonusTypes";
import { HealthBonusEffect } from "./HealthBonusEffect";

export class HealthBonus extends SystemBonus {
    constructor(effect: HealthBonusEffect) {
        super(SystemBonusTypes.Health, effect);
    }

    getEffect(): HealthBonusEffect {
        return this.effect as HealthBonusEffect;
    }
}