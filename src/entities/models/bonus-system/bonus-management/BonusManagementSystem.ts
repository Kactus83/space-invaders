import { PlayerProfile } from "../../../../game-services/player-profile/PlayerProfile";
import { Player } from "../../../player/Player";
import { SystemBonus } from "../system-bonus/SystemBonus";
import { SystemBonusTypes } from "../system-bonus/SystemBonusTypes";

export class BonusManagementSystem {
    private static readonly MAX_ACTIVE_BONUSES = 3;
    private player: Player;
    public activeBonuses: SystemBonus[] = [];

    constructor(player: Player) {
        this.player = player;
    }

    // Ajouter un bonus à l'inventaire ou aux bonus actifs
    public addBonus(bonus: SystemBonus): void {
        if (this.activeBonuses.length < BonusManagementSystem.MAX_ACTIVE_BONUSES) {
            this.activateBonus(bonus);
        } else {
            PlayerProfile.getInstance().getInventory().getBonusInventory().addBonus(bonus);
        }
    }

    // Activer un bonus spécifique
    private activateBonus(bonus: SystemBonus): void {
        console.log("Activating bonus:", bonus.getType());
        this.activeBonuses.push(bonus);
        switch (bonus.getType()) {
            case SystemBonusTypes.Speed:
                this.player.speedSystem.addBonus(bonus);
                break;
            case SystemBonusTypes.Health:
                this.player.healthSystem.addBonus(bonus);
                break;
            case SystemBonusTypes.Weapon:
                this.player.weaponSystem.addBonus(bonus);
                break;
            case SystemBonusTypes.Experience:
                this.player.experienceSystem.addBonus(bonus);
                break;
            default:
                console.warn("Unhandled bonus type:", bonus.getType());
                break;
        }
    }

    public activateFirstActiveBonus(): void {
        if (this.activeBonuses.length > 0) {
            this.activateBonus(this.activeBonuses[0]);
        }
    }

    // Obtenir l'état actuel des bonus actifs
    public getActiveBonuses(): SystemBonus[] {
        return this.activeBonuses;
    }
}