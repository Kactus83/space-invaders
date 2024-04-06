import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class TripleShotSkill extends Skill {
    constructor() {
        super(SkillsIds.Triple_Shot, "Triple Shot", "Fire three projectiles simultaneously.", 0, 0, 50); // 90 sec cooldown, 15 sec duration
    }
}