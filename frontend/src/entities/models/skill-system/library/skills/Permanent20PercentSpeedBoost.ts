import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";


export class Permanent20PercentSpeedBoostSkill extends Skill {
    constructor() {
        super(SkillsIds.Permanent_20PercentSpeedBoost, "Permanent 20% Speed Boost", "Increases speed by 20% permanently.", 0, 0, 500);
    }
}