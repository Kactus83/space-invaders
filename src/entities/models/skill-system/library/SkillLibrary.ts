
import { Skill } from "../skill/Skill";
import { PickupBonusSkill } from "./skills/PickupBonusSkill";
import { SpeedBoostSkill } from "./skills/SpeedBoostSkill";
import { HealSkill } from "./skills/HealSkill";
import { DoubleShotSkill } from "./skills/DoubleShotSkill";
import { TripleShotSkill } from "./skills/TripleShotSkill";
import { SemiReflectiveShieldSkill } from "./skills/SemiReflectiveShieldSkill";
import { SkillsIds } from "../types/SkillsIds";
import { Permanent20PercentSpeedBoostSkill } from "./skills/Permanent20PercentSpeedBosst";
import { Permanent50PercentSpeedBoostSkill } from "./skills/Permanent50PercentSpeedBoost";
import { PermanentIncrease1Shield } from "./skills/PermanentIncrease1Shield";
import { PermanentIncrease2Shield } from "./skills/PermanentIncrease2Shield";
import { PermanentWeaponUpgrade1 } from "./skills/PermanentWeaponUpgrade1";
import { PermanentWeaponUpgrade2 } from "./skills/PermanentWeaponUpgrade2";

type SkillCreator = { [K in SkillsIds]: () => Skill };

export class SkillLibrary {
    private static skills: SkillCreator = {
        [SkillsIds.PickupBonus]: () => new PickupBonusSkill(),
        [SkillsIds.SpeedBoost]: () => new SpeedBoostSkill(),
        [SkillsIds.Permanent_20PercentSpeedBoost] : () => new Permanent20PercentSpeedBoostSkill(),
        [SkillsIds.Permanent_50PercentSpeedBoost] : () => new Permanent50PercentSpeedBoostSkill(),
        [SkillsIds.Heal]: () => new HealSkill(),
        [SkillsIds.Double_Shot]: () => new DoubleShotSkill(),
        [SkillsIds.Triple_Shot]: () => new TripleShotSkill(),
        [SkillsIds.Semi_ReflectiveShield]: () => new SemiReflectiveShieldSkill(),
        [SkillsIds.Permanent_Increase_1_Shield]: () => new PermanentIncrease1Shield(),
        [SkillsIds.Permanent_Increase_2_Shield]: () => new PermanentIncrease2Shield(),
        [SkillsIds.Permanent_Weapon_Upgrade_1]: () => new PermanentWeaponUpgrade1(),
        [SkillsIds.Permanent_Weapon_Upgrade_2]: () => new PermanentWeaponUpgrade2(),
    };

    static getSkillById(id: SkillsIds): Skill | null {
        const skillCreator = this.skills[id];
        if (skillCreator) {
            return skillCreator();
        }
        return null;
    }

    static getAllSkills(): Skill[] {
        return Object.values(this.skills).map(creator => creator());
    }
}