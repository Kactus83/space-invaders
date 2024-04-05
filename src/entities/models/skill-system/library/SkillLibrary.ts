import { Skill } from "../skill/Skill";
import { PickupBonusSkill } from "./skills/PickupBonusSkill";
import { SpeedBoostSkill } from "./skills/SpeedBoostSkill";
import { HealSkill } from "./skills/HealSkill";
import { SkillsIds } from "../types/SkillsIds";


type SkillCreator = { [K in SkillsIds]: () => Skill };

export class SkillLibrary {
    private static skills: SkillCreator = {
        [SkillsIds.PickupBonus]: () => new PickupBonusSkill(),
        [SkillsIds.SpeedBoost]: () => new SpeedBoostSkill(),
        [SkillsIds.Heal]: () => new HealSkill(),
    };

    static getSkillById(id: SkillsIds): Skill | null {
        const skillCreator = this.skills[id];
        if (skillCreator) {
            return skillCreator();
        }
        return null;
    }
}

