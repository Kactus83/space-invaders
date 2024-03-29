import { BonusType } from "./BonusType";

export interface IBonusCharacteristics {
    type: BonusType;
    effectValue: number; // Valeur de l'effet du bonus
    duration?: number; // Durée pour les bonus temporaires, en secondes
}