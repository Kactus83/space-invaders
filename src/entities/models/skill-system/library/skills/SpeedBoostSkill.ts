import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class SpeedBoostSkill extends Skill {
    constructor() {
        super(SkillsIds.SpeedBoost, "Speed Boost", "Double speed for a short duration.", 60000, 30000, 200); // 60 sec cooldown
    }
}
