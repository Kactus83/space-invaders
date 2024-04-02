import { BonusSystemInventory } from "./BonusSystemInventory";

export class PlayerInventory {
    private bonusInventory: BonusSystemInventory;

    constructor() {
        this.bonusInventory = new BonusSystemInventory();
    }

    getBonusInventory(): BonusSystemInventory {
        return this.bonusInventory;
    }

    // Placeholders pour d'autres systèmes d'inventaire futurs
}