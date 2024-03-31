import { BonusTypes } from "./BonusTypes";
import { IBonusEffect } from "./IBonusEffect";

export abstract class Bonus {
    protected type: BonusTypes;
    public readonly effect: IBonusEffect;
    protected activationTimestamp: number | null = null;
    protected state: 'available' | 'active' | 'expired' = 'available';

    constructor(type: BonusTypes, effect: IBonusEffect) {
        this.type = type;
        this.effect = effect;
    }

    // Méthode pour activer le bonus
    activate(): void {
        this.state = 'active';
        this.activationTimestamp = Date.now();
    }

    // Vérifie si le bonus est expiré
    checkExpiration(): void {
        if (this.state !== 'active' || this.activationTimestamp === null) return;

        if ((Date.now() - this.activationTimestamp) >= this.effect.duration * 1000) {
            this.state = 'expired';
        }
    }

    // Getter pour le type de bonus
    getType(): BonusTypes {
        return this.type;
    }

    // Getter pour l'état du bonus
    getState(): 'available' | 'active' | 'expired' {
        return this.state;
    }
}