import { IHealthCharacteristics } from "../models/health-system/IHealthCharasteristics";
import { IWeaponCharacteristics } from "../models/weapon-system/IWeaponCharacteristics";

export interface IPlayerLevelCharacteristics extends IHealthCharacteristics, IWeaponCharacteristics {
    level: number;
    lifeBonus: number;
    scoreThreshold: number;
    moveSpeed: number;
}