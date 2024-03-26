import { IHealthCharacteristics } from "../models/health-system/IHealthCharasteristics";
import { IWeaponCharacteristics } from "../models/weapon-system/IWeaponCharacteristics";
import { InvaderType } from "./InvaderType";

export interface IInvaderCharacteristics extends IHealthCharacteristics, IWeaponCharacteristics {
    type: InvaderType;
    speed: number;
    score: number;
}