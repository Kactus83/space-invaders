import { BonusSystemInventory } from "./BonusSystemInventory";

export class PlayerInventory {
    private bonusInventory: BonusSystemInventory;

    constructor() {
        this.bonusInventory = new BonusSystemInventory();
    }

    restoreFromData(data: { bonusInventory: any[] }): void {
        // Assurez-vous d'adapter le type de `bonusInventory` selon vos besoins
    }

    getBonusInventory(): BonusSystemInventory {
        return this.bonusInventory;
    }

    // Placeholders pour d'autres systèmes d'inventaire futurs
}