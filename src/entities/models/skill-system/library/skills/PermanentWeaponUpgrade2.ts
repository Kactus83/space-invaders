import { Skill } from "../../skill/Skill";
import { SkillsIds } from "../../types/SkillsIds";

export class PermanentWeaponUpgrade2 extends Skill {
    constructor() {
        super(SkillsIds.Permanent_Weapon_Upgrade_2, "Permanent Weapon Upgrade 2", "Upgrade your weapon permanently by 2 level.", 0, 0, 5000);
    }
}