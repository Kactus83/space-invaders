
import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class SemiReflectiveShieldSkill extends Skill {
    constructor() {
        super(SkillsIds.Semi_ReflectiveShield, "Semi-Reflective Shield", "Reflects a portion of incoming projectiles.", 0, 0, 10000); // 120 sec cooldown, 20 sec duration
    }
}