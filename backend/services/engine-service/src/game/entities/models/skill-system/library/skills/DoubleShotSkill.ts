
import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class DoubleShotSkill extends Skill {
    constructor() {
        super(SkillsIds.Double_Shot, "Double Shot", "Fire two projectiles simultaneously.", 0, 0, 2500); // 60 sec cooldown, 15 sec duration
    }
}