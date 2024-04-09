import { IBonusEmitterCharacteristics } from "../models/bonus-system/bonus-emitter/IBonusEmitterCharacteristics";
import { IHealthCharacteristics } from "../models/health-system/IHealthCharasteristics";
import { ISkillCharacteristics } from "../models/skill-system/ISkillCharacteristics";
import { SkillsIds } from "../models/skill-system/types/SkillsIds";
import { ISpeedCharacteristics } from "../models/speed-system/ISpeedCharacteristics";
import { IWeaponCharacteristics } from "../models/weapon-system/IWeaponCharacteristics";

export interface IInvaderBossCharacteristics extends IHealthCharacteristics, IWeaponCharacteristics, ISpeedCharacteristics, IBonusEmitterCharacteristics, ISkillCharacteristics {
    width: number;
    height: number;
    score: number;
}