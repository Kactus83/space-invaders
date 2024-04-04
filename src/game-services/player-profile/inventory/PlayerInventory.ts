import { SystemBonus } from "../../../entities/models/bonus-system/system-bonus/SystemBonus";
import { PlayerDataService } from "../datas/PlayerDataService";
import { BonusSystemInventory } from "./BonusSystemInventory";

export class PlayerInventory {
    private bonusInventory: BonusSystemInventory;

    constructor() {
        this.bonusInventory = new BonusSystemInventory();
    }

    addBonusToInventory(bonus: SystemBonus): void {
        this.bonusInventory.addBonus(bonus);
        PlayerDataService.getInstance().saveCurrentProfile();
    }

    getAllBonus(): SystemBonus[] {
        return this.bonusInventory.getBonuses();
    }

    restoreFromData(): void {
        const bonuses = PlayerDataService.getInstance().loadCurrentProfile()?.inventory.bonusInventory;
        this.bonusInventory.restoreBonuses(bonuses);
    }

    // Placeholders pour d'autres systèmes d'inventaire futurs
}