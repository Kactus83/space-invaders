import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class PickupBonusSkill extends Skill {
    constructor() {
        super(SkillsIds.PickupBonus, "Pickup Bonus", "Collect bonuses using projectiles.", 0, 0, 500);
    }
}
