import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class PermanentIncrease1Shield extends Skill {
    constructor() {
        super(SkillsIds.Permanent_Increase_1_Shield, "Permanent Increase 1 Shield", "Increase your shield permanently by 1 level.", 0, 0, 750);
    }
}