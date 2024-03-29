import { IHealthCharacteristics } from "../health-system/IHealthCharasteristics";
import { ISpeedCharacteristics } from "../speed-system/ISpeedCharacteristics";
import { IWeaponCharacteristics } from "../weapon-system/IWeaponCharacteristics";

export interface ILevelSystemCharacteristics extends IHealthCharacteristics, IWeaponCharacteristics, ISpeedCharacteristics {
    level: number;
    scoreThreshold: number;
    lifeBonus: number; 
}
