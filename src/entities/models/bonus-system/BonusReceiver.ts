import { Bonus } from "./Bonus";

export abstract class BonusReceiver<T extends Bonus> {
    protected temporaryBonus: T | null = null;
    protected permanentBonus: T | null = null;

    // Ajoute et active un bonus
    addBonus(bonus: T): void {
        if (bonus.effect.duration === Infinity) {
            this.permanentBonus = bonus;
        } else {
            this.temporaryBonus = bonus;
        }
        bonus.activate();
    }

    // Vérifie et met à jour l'état des bonus
    updateBonuses(): void {
        if (this.temporaryBonus && this.temporaryBonus.getState() === 'active') {
            this.temporaryBonus.checkExpiration();
            if (this.temporaryBonus.getState() === 'expired') {
                this.temporaryBonus = null;
            }
        }
        // Ajout de logique pour le bonus permanent si nécessaire
    }
}
