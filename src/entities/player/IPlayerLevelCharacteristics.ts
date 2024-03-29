import { IHealthCharacteristics } from "../models/health-system/IHealthCharasteristics";
import { ISpeedCharacteristics } from "../models/speed-system/ISpeedCharacteristics";
import { IWeaponCharacteristics } from "../models/weapon-system/IWeaponCharacteristics";

export interface IPlayerLevelCharacteristics extends IHealthCharacteristics, IWeaponCharacteristics, ISpeedCharacteristics {
    level: number;
    lifeBonus: number;
    scoreThreshold: number;
    moveSpeed: number;
}