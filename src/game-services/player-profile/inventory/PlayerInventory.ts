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
        PlayerDataService.getInstance().saveCurrentProfile(this.playerProfile);
    }

    getAllBonus(): SystemBonus[] {
        return this.bonusInventory.getBonuses();
    }

    restoreFromData(): void {
        const bonuses = PlayerDataService.getInstance().loadCurrentProfile(this.playerProfile.getPlayerName())?.inventory.bonusInventory;
        this.bonusInventory.restoreBonuses(bonuses);
    }

    // Placeholders pour d'autres systèmes d'inventaire futurs
}