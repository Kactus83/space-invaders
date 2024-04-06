import { SystemBonusTypes } from "./SystemBonusTypes";
import { ISystemBonusEffect } from "./ISystemBonusEffect";

export abstract class SystemBonus {
    protected type: SystemBonusTypes;
    public readonly effect: ISystemBonusEffect;
    protected activationTimestamp: number | null = null;
    protected remainingDuration: number;
    protected state: 'available' | 'active' | 'expired' = 'available';

    constructor(type: SystemBonusTypes, effect: ISystemBonusEffect) {
        this.type = type;
        this.effect = effect;
    }

    // Méthode pour activer le bonus
    activate(): void {
        this.state = 'active';
        this.activationTimestamp = Date.now();
        this.remainingDuration = this.effect.duration * 1000;
    }
    
    // Méthode pour mettre à jour l'état du bonus
    update(): void {
        if (this.state === 'active' && this.activationTimestamp) {
            const elapsed = Date.now() - this.activationTimestamp;
            this.remainingDuration -= elapsed;

            if (this.remainingDuration <= 0) {
                this.state = 'expired';
            }
        }
    }

    // Vérifie si le bonus est expiré
    checkExpiration(): void {
        if (this.state !== 'active' || this.activationTimestamp === null) return;

        if (this.state === 'active' && this.remainingDuration <= 0) {
            this.state = 'expired';
        }
    }

    // Getter pour le type de bonus
    getType(): SystemBonusTypes {
        return this.type;
    }

    // Getter pour l'état du bonus
    getState(): 'available' | 'active' | 'expired' {
        this.checkExpiration();
        return this.state;
    }

    getRemainingDuration(): number {
        return this.remainingDuration;
    }

    abstract getEffect(): ISystemBonusEffect;
}