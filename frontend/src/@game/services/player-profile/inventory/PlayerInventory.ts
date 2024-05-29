import { SystemBonus } from "../../../entities/models/bonus-system/system-bonus/SystemBonus";
import { PlayerProfile } from "../PlayerProfile";
import { PlayerDataService } from "../datas/PlayerDataService";
import { BonusSystemInventory } from "./BonusSystemInventory";

export class PlayerInventory {
    private bonusInventory: BonusSystemInventory;
    private playerProfile: PlayerProfile;

    constructor(playerProfile: PlayerProfile) {
        this.playerProfile = playerProfile;
        this.bonusInventory = new BonusSystemInventory();
        this.restoreFromData();
    }

    addBonusToInventory(bonus: SystemBonus): void {
        this.bonusInventory.addBonus(bonus);
    }

    getAllBonus(): SystemBonus[] {
        return this.bonusInventory.getBonuses();
    }

    restoreFromData(): void {
        const bonuses = PlayerDataService.getInstance().getProfile()?.inventory.bonusInventory;
        if (bonuses) {
            this.bonusInventory.setBonuses(bonuses);
        }
    }

    removeBonusByType(bonusType: string): boolean {
        // Trouver le bonus par type et le supprimer
        const index = this.bonusInventory.getBonuses().findIndex(bonus => bonus.getType() === bonusType);
        if (index !== -1) {
            return this.bonusInventory.removeBonusAt(index);
        }
        return false;
    }
}
