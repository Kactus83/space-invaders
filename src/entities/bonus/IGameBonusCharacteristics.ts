import { SystemBonusType } from "../models/bonus-system/system-bonus/SystemBonusType";
import { ISpeedCharacteristics } from "../models/speed-system/ISpeedCharacteristics";

export interface IGameBonusCharacteristics extends ISpeedCharacteristics {
    systemBonus: SystemBonusType;
    moveSpeed: number;
}
