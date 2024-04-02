import { SystemBonus } from "../system-bonus/SystemBonus";

export abstract class BonusReceiverTemplate<T extends SystemBonus> {
    protected currentBonus: T | null = null;

    // Déposer un bonus dans le système
    public depositBonus(bonus: T): void {
        this.currentBonus = bonus;
    }

    // Retirer le bonus actuellement stocké
    public withdrawBonus(): T | null {
        const bonus = this.currentBonus;
        this.currentBonus = null;
        return bonus;
    }

    // Vérifier si le système possède un bonus actif
    public hasActiveBonus(): boolean {
        return this.currentBonus !== null;
    }

    // Récupérer le bonus actif (sans le retirer)
    public getActiveBonus(): T | null {
        return this.currentBonus;
    }
}
