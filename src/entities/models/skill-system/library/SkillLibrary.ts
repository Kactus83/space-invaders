import { Skill } from "../skill/Skill";
import { PickupBonusSkill } from "./skills/PickupBonusSkill";
import { SpeedBoostSkill } from "./skills/SpeedBoostSkill";
import { HealSkill } from "./skills/HealSkill";
import { SkillsIds } from "../types/SkillsIds";

export class SkillLibrary {
    private static skills: { [id: SkillsIds]: () => Skill } = {
        "pickupBonus": () => new PickupBonusSkill(),
        "speedBoost": () => new SpeedBoostSkill(),
        "heal": () => new HealSkill(),
    };

    static getSkillById(id: SkillsIds): Skill | null {
        const skillCreator = this.skills[id];
        if (skillCreator) {
            return skillCreator();
        }
        return null;
    }
}
