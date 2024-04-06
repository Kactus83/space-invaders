
import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class DoubleShotSkill extends Skill {
    constructor() {
        super(SkillsIds.Double_Shot, "Double Shot", "Fire two projectiles simultaneously.", 60000, 15000, 300); // 60 sec cooldown, 15 sec duration
    }
}