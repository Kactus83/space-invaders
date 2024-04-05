import { Skill } from "../skill/Skill";
import { PickupBonusSkill } from "./skills/PickupBonusSkill";
import { SpeedBoostSkill } from "./skills/SpeedBoostSkill";
import { HealSkill } from "./skills/HealSkill";

export class SkillLibrary {
    private static skills: { [id: string]: () => Skill } = {
        "pickupBonus": () => new PickupBonusSkill(),
        "speedBoost": () => new SpeedBoostSkill(),
        "heal": () => new HealSkill(),
    };

    static getSkillById(id: string): Skill | null {
        const skillCreator = this.skills[id];
        if (skillCreator) {
            return skillCreator();
        }
        return null;
    }
}
