import { IHealthCharacteristics } from "../../health-system/IHealthCharasteristics";
import { ISkillCharacteristics } from "../../skill-system/ISkillCharacteristics";
import { ISpeedCharacteristics } from "../../speed-system/ISpeedCharacteristics";
import { IWeaponCharacteristics } from "../../weapon-system/IWeaponCharacteristics";
import { IExperienceSystemCharacteristics } from "./IExperienceSystemCharacteristics";

export interface ISystemsCaracteristicsSet extends IExperienceSystemCharacteristics, IHealthCharacteristics, ISpeedCharacteristics, IWeaponCharacteristics, ISkillCharacteristics {
}