import { BonusType } from "../models/bonus-system/BonusType";
import { ISpeedCharacteristics } from "../models/speed-system/ISpeedCharacteristics";

export interface IGameBonusCharacteristics extends ISpeedCharacteristics {
    bonus: BonusType;
    moveSpeed: number;
}
