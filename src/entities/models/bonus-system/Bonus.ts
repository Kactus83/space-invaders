import { BonusType } from "./BonusType";
import { IBonusEffect } from "./IBonusEffect";

export abstract class Bonus {
    protected type: BonusType;
    public readonly effect: IBonusEffect;
    protected activationTimestamp: number | null = null;
    protected state: 'available' | 'active' | 'expired' = 'available';

    constructor(type: BonusType, effect: IBonusEffect) {
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

        if ((Date.now() - this.activationTimestamp) >= this.duration * 1000) {
            this.state = 'expired';
        }
    }

    // Getter pour le type de bonus
    getType(): BonusType {
        return this.type;
    }

    // Getter pour l'état du bonus
    getState(): 'available' | 'active' | 'expired' {
        return this.state;
    }
}