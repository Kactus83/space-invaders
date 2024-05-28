import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class PermanentWeaponUpgrade1 extends Skill {
    constructor() {
        super(SkillsIds.Permanent_Weapon_Upgrade_1, "Permanent Weapon Upgrade 1", "Upgrade your weapon permanently by 1 level.", 0, 0, 2500);
    }
}