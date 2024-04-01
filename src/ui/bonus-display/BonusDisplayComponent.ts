// BonusDisplayComponent.ts
import { fabric } from "fabric";
import { SystemBonus } from "../../entities/models/bonus-system/system-bonus/SystemBonus";

export class BonusDisplayComponent {
    private bonuses: SystemBonus[] = [];
    private fabricObjects: fabric.Object[] = [];

    constructor(bonuses: SystemBonus[]) {
        this.bonuses = bonuses;
        this.updateDisplay();
    }

    updateDisplay(): void {
        this.fabricObjects = []; // Reset the fabric objects

        // Example of how to create fabric.Text for each bonus
        this.bonuses.forEach((bonus, index) => {
            const bonusText = new fabric.Text(`${bonus.getType()}`, {
                left: 10,
                top: index * 20 + 40, // Stacking bonuses vertically
                fontSize: 14,
                fill: 'white',
            });
            this.fabricObjects.push(bonusText);
        });
    }

    getDrawableObjects(): fabric.Object[] {
        return this.fabricObjects;
    }

    setBonuses(bonuses: SystemBonus[]): void {
        this.bonuses = bonuses;
        this.updateDisplay();
    }
}
