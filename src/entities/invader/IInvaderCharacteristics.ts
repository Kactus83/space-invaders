import { IBonusEmitterCharacteristics } from "../models/bonus-system/bonus-emitter/IBonusEmitterCharacteristics";
import { IHealthCharacteristics } from "../models/health-system/IHealthCharasteristics";
import { ISpeedCharacteristics } from "../models/speed-system/ISpeedCharacteristics";
import { IWeaponCharacteristics } from "../models/weapon-system/IWeaponCharacteristics";
import { InvaderType } from "./InvaderType";

/**
 * Invader characteristics for each invader type.
 */
export interface IInvaderCharacteristics extends IHealthCharacteristics, IWeaponCharacteristics, ISpeedCharacteristics, IBonusEmitterCharacteristics {
    type: InvaderType;
    width: number; 
    height: number;
    moveSpeed: number;
    score: number;
}