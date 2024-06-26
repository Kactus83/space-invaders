import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class TripleShotSkill extends Skill {
    constructor() {
        super(SkillsIds.Triple_Shot, "Triple Shot", "Fire three projectiles simultaneously.", 0, 0, 10000, SkillsIds.Double_Shot); // 90 sec cooldown, 15 sec duration
    }
}