import { PlayerProfile } from "../../../../game-services/player-profile/PlayerProfile";
import { Player } from "../../../player/Player";
import { ExperienceBonus } from "../../experience-system/bonus/ExperienceBonus";
import { HealthBonus } from "../../health-system/bonus/HealthBonus";
import { SpeedBonus } from "../../speed-system/bonus/SpeedBonus";
import { WeaponBonus } from "../../weapon-system/bonus/WeaponBonus";
import { SystemBonus } from "../system-bonus/SystemBonus";
import { SystemBonusTypes } from "../system-bonus/SystemBonusTypes";

export class BonusManagementSystem {
    private player: Player;
    public availableBonuses: SystemBonus[] = [];
    public activeBonuses: SystemBonus[] = [];

    constructor(player: Player) {
        this.player = player;
    }

    // Ajouter un bonus et le placer correctement
    public addBonus(bonus: SystemBonus): void {
        if (this.availableBonuses.length < 3) {
            this.availableBonuses.push(bonus);
        } else {
            // Si les slots actifs sont pleins, le bonus va dans l'inventaire
            PlayerProfile.getInstance().getInventory().getBonusInventory().addBonus(bonus);
        }
    }

    // Activer et appliquer un bonus spécifique
    private activateAndApplyBonus(bonus: SystemBonus): void {
        if (bonus instanceof SpeedBonus) {
            this.player.speedSystem.depositBonus(bonus);
        } else if (bonus instanceof HealthBonus) {
            this.player.healthSystem.depositBonus(bonus);
        } else if (bonus instanceof WeaponBonus) {
            this.player.weaponSystem.depositBonus(bonus);
        } else if (bonus instanceof ExperienceBonus) {
            this.player.experienceSystem.depositBonus(bonus);
        } else {
            console.error("Unhandled bonus type:", bonus.getType());
            return;
        }
        
        bonus.activate();
        this.activeBonuses.push(bonus);
        this.availableBonuses = this.availableBonuses.filter(b => b !== bonus);
    }

    // Mise à jour régulière pour vérifier l'expiration des bonus
    public update(): void {
        this.availableBonuses = this.availableBonuses.filter(bonus => {
            if (bonus.getState() === 'expired') {
                this.withdrawBonus(bonus); // Retirer le bonus expiré
                return false; // Retirer de la liste des bonus actifs
            }
            return true;
        });
    }

    // Retirer un bonus du système correspondant
    private withdrawBonus(bonus: SystemBonus): void {
        switch (bonus.getType()) {
            case SystemBonusTypes.Speed:
                if (this.player.speedSystem.getActiveBonus() === bonus) {
                    this.player.speedSystem.withdrawBonus();
                }
                break;
            case SystemBonusTypes.Health:
                if (this.player.healthSystem.getActiveBonus() === bonus) {
                    this.player.healthSystem.withdrawBonus();
                }
                break;
            case SystemBonusTypes.Weapon:
                if (this.player.weaponSystem.getActiveBonus() === bonus) {
                    this.player.weaponSystem.withdrawBonus();
                }
                break;
            case SystemBonusTypes.Experience:
                if(this.player.experienceSystem.getActiveBonus() === bonus) {
                    this.player.experienceSystem.withdrawBonus();
                }
                break;
            default:
                console.error("Unhandled bonus type:", bonus.getType());
                break;
        }
    }

    public activateFirstActiveBonus(): void {
        if (this.availableBonuses.length > 0) {
            this.activateAndApplyBonus(this.availableBonuses[0]);
        }
    }
}
