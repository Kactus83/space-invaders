import { SystemBonus } from "../../bonus-system/system-bonus/SystemBonus";
import { SystemBonusTypes } from "../../bonus-system/system-bonus/SystemBonusTypes";
import { ExperienceBonusEffect } from "./ExperienceBonusEffect";

export class ExperienceBonus extends SystemBonus {
    constructor(effect: ExperienceBonusEffect) {
        super(SystemBonusTypes.Experience, effect);
    }

    getEffect(): ExperienceBonusEffect {
        return this.effect as ExperienceBonusEffect;
    }
}