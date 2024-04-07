import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class PermanentIncrease2Shield extends Skill {
    constructor() {
        super(SkillsIds.Permanent_Increase_2_Shield, "Permanent Increase 2 Shield", "Increase your shield permanently by 2 level.", 0, 0, 2500);
    }
}