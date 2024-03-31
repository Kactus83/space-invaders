import { BonusEffectType } from "./BonusEffectType";

export interface IBonusEffect {
    duration: number; // Durée de l'effet du bonus en secondes
    effectType: BonusEffectType; // Type de l'effet du bonus
}
