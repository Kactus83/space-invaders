import { SystemBonusEffectType } from "./SystemBonusEffectType";

export interface ISystemBonusEffect {
    duration: number; // Durée de l'effet du bonus en secondes
    effectType: SystemBonusEffectType; // Type de l'effet du bonus
}
