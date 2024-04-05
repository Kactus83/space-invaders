import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class HealSkill extends Skill {
    constructor() {
        super(SkillsIds.Heal, "Heal", "Heals the player by 50% of max health.", 60000, 30000, 500); // 60 sec cooldown
    }
}
