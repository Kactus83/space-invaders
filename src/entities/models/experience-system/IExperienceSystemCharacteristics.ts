import { IHealthCharacteristics } from "../health-system/IHealthCharasteristics";
import { ISpeedCharacteristics } from "../speed-system/ISpeedCharacteristics";
import { IWeaponCharacteristics } from "../weapon-system/IWeaponCharacteristics";

export interface IExperienceSystemCharacteristics extends IHealthCharacteristics, IWeaponCharacteristics, ISpeedCharacteristics {
    level: number;
    scoreThreshold: number;
    lifeBonus: number; 
}
