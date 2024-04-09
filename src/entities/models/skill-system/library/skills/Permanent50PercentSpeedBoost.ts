import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class Permanent50PercentSpeedBoostSkill extends Skill {
    constructor() {
        super(SkillsIds.Permanent_50PercentSpeedBoost, "Permanent 50% Speed Boost", "Increases speed by 50% permanently.", 0, 0, 2500, SkillsIds.Permanent_20PercentSpeedBoost);
    }
}