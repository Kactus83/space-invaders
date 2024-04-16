import { SystemBonus } from "../../bonus-system/system-bonus/SystemBonus";
import { SystemBonusTypes } from "../../bonus-system/system-bonus/SystemBonusTypes";
import { SkillBonusEffect } from "./SkillBonusEffect";

export class SkillBonus extends SystemBonus {
    constructor(effect: SkillBonusEffect) {
        super(SystemBonusTypes.Skill, effect);
    }

    getEffect(): SkillBonusEffect {
        return this.effect as SkillBonusEffect;
    }
}