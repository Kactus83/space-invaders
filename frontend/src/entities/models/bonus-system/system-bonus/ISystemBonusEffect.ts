import { GameBonusType } from "../../../bonus/GameBonusTypes";
import { SystemBonusEffectType } from "./SystemBonusEffectType";

export interface ISystemBonusEffect {
    name: GameBonusType; // Nom de l'effet du bonus
    casualName: string; // Nom simplifié du bonus
    duration: number; // Durée de l'effet du bonus en secondes
}
