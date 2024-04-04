import { IHealthCharacteristics } from "../../health-system/IHealthCharasteristics";
import { ISpeedCharacteristics } from "../../speed-system/ISpeedCharacteristics";
import { IWeaponCharacteristics } from "../../weapon-system/IWeaponCharacteristics";
import { IExperienceSystemCharacteristics } from "./IExperienceSystemCharacteristics";

export interface ISystemsCaracteristicsSet extends IExperienceSystemCharacteristics, IHealthCharacteristics, ISpeedCharacteristics, IWeaponCharacteristics {
}