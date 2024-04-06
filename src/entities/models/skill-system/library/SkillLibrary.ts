
import { Skill } from "../skill/Skill";
import { PickupBonusSkill } from "./skills/PickupBonusSkill";
import { SpeedBoostSkill } from "./skills/SpeedBoostSkill";
import { HealSkill } from "./skills/HealSkill";
import { DoubleShotSkill } from "./skills/DoubleShotSkill";
import { TripleShotSkill } from "./skills/TripleShotSkill";
import { SemiReflectiveShieldSkill } from "./skills/SemiReflectiveShieldSkill";
import { SkillsIds } from "../types/SkillsIds";

type SkillCreator = { [K in SkillsIds]: () => Skill };

export class SkillLibrary {
    private static skills: SkillCreator = {
        [SkillsIds.PickupBonus]: () => new PickupBonusSkill(),
        [SkillsIds.SpeedBoost]: () => new SpeedBoostSkill(),
        [SkillsIds.Heal]: () => new HealSkill(),
        [SkillsIds.Double_Shot]: () => new DoubleShotSkill(),
        [SkillsIds.Triple_Shot]: () => new TripleShotSkill(),
        [SkillsIds.Semi_ReflectiveShield]: () => new SemiReflectiveShieldSkill(),
    };

    static getSkillById(id: SkillsIds): Skill | null {
        const skillCreator = this.skills[id];
        if (skillCreator) {
            return skillCreator();
        }
        return null;
    }

    static getAllSkills(): Skill[] {
        return Object.values(this.skills).map(creator => creator());
    }
}