import { Player } from "../../../player/Player";
import { SystemBonus } from "../system-bonus/SystemBonus";
import { SystemBonusTypes } from "../system-bonus/SystemBonusTypes";

export class BonusManagementSystem {
    private player: Player;
    private bonusInventory: SystemBonus[] = [];

    constructor(player: Player) {
        this.player = player;
    }

    // Ajouter un bonus à l'inventaire
    public addBonusToInventory(bonus: SystemBonus): void {
        this.bonusInventory.push(bonus);
    }

    // Activer un bonus spécifique
    public activateBonus(bonus: SystemBonus): void {
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
            default:
                break;
        }
    }

    // Obtenir l'état actuel de l'inventaire des bonus
    public getBonusInventory(): SystemBonus[] {
        return this.bonusInventory;
    }
}
