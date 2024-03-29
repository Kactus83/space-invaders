import { IHealthCharacteristics } from "../models/health-system/IHealthCharasteristics";
import { ISpeedCharacteristics } from "../models/speed-system/ISpeedCharacteristics";
import { IWeaponCharacteristics } from "../models/weapon-system/IWeaponCharacteristics";
import { InvaderType } from "./InvaderType";

export interface IInvaderCharacteristics extends IHealthCharacteristics, IWeaponCharacteristics, ISpeedCharacteristics {
    type: InvaderType;
    moveSpeed: number;
    score: number;
}