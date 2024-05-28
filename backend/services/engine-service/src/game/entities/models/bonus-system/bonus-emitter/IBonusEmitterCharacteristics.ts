import { GameBonusType } from "../../../bonus/GameBonusTypes";

export interface IBonusEmitterCharacteristics {
    emitProbability: number;
    bonusTypes: GameBonusType[];
}
