import { PlayerProfile } from "../../../../game-services/player-profile/PlayerProfile";
import { Player } from "../../../player/Player";
import { ExperienceBonus } from "../../experience-system/bonus/ExperienceBonus";
import { HealthBonus } from "../../health-system/bonus/HealthBonus";
import { SkillBonus } from "../../skill-system/bonus/SkillBonus";
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
            // Retirer le premier bonus de l'array et le stocker dans l'inventaire
            const bonusToStore = this.availableBonuses.shift();
            if (bonusToStore) {
                PlayerProfile.getInstance().getInventory().addBonusToInventory(bonusToStore);
            }
            // Ajouter le nouveau bonus à l'array des bonus disponibles
            this.availableBonuses.push(bonus);
        }
    }

    // Activer et appliquer un bonus spécifique
    private activateAndApplyBonus(bonus: SystemBonus): void {
        let canDeposit = false;
    
        if (bonus instanceof SpeedBonus) {
            canDeposit = !this.player.speedSystem.hasActiveBonus();
            if (canDeposit) this.player.speedSystem.depositBonus(bonus);
        } else if (bonus instanceof HealthBonus) {
            canDeposit = !this.player.healthSystem.hasActiveBonus();
            if (canDeposit) this.player.healthSystem.depositBonus(bonus);
        } else if (bonus instanceof WeaponBonus) {
            canDeposit = !this.player.weaponSystem.hasActiveBonus();
            if (canDeposit) this.player.weaponSystem.depositBonus(bonus);
        } else if (bonus instanceof ExperienceBonus) {
            canDeposit = !this.player.experienceSystem.hasActiveBonus();
            if (canDeposit) this.player.experienceSystem.depositBonus(bonus);
        } else if (bonus instanceof SkillBonus) {
            canDeposit = !this.player.skillSystem.hasActiveBonus();
            if (canDeposit) this.player.skillSystem.depositBonus(bonus);
        } else {
            console.error("Unhandled bonus type:", bonus.getType());
            return;
        }
    
        if (canDeposit) {
            this.player.animationSystem.startBonusAnimation();
            bonus.activate();
            this.activeBonuses.push(bonus);
            // Enlever le bonus de la liste des disponibles
            this.availableBonuses = this.availableBonuses.filter(b => b !== bonus);
        } else {
            // Gérer le cas où un bonus ne peut être activé car un bonus est déjà actif dans le sous-système
            console.log(`Cannot activate ${bonus.getType()} bonus because another bonus is already active in its system.`);
        }
    }    

    // Mise à jour régulière pour vérifier l'expiration des bonus
    public update(): void {
        // Mise à jour des bonus actifs
        this.activeBonuses.forEach(bonus => bonus.update());
    
        // Filtrer les bonus actifs pour retirer ceux qui sont expirés
        this.activeBonuses = this.activeBonuses.filter(bonus => {
            if (bonus.getState() === 'expired') {
                this.withdrawBonus(bonus);
                return false; 
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
                    // Retirer le bonus de la liste des actifs
                    this.activeBonuses = this.activeBonuses.filter(b => b !== bonus);
                }
                break;
            case SystemBonusTypes.Health:
                if (this.player.healthSystem.getActiveBonus() === bonus) {
                    this.player.healthSystem.withdrawBonus();
                    // Retirer le bonus de la liste des actifs
                    this.activeBonuses = this.activeBonuses.filter(b => b !== bonus);
                }
                break;
            case SystemBonusTypes.Weapon:
                if (this.player.weaponSystem.getActiveBonus() === bonus) {
                    this.player.weaponSystem.withdrawBonus();
                    // Retirer le bonus de la liste des actifs
                    this.activeBonuses = this.activeBonuses.filter(b => b !== bonus);
                }
                break;
            case SystemBonusTypes.Experience:
                if(this.player.experienceSystem.getActiveBonus() === bonus) {
                    this.player.experienceSystem.withdrawBonus();
                    // Retirer le bonus de la liste des actifs
                    this.activeBonuses = this.activeBonuses.filter(b => b !== bonus);
                }
                break;
            case SystemBonusTypes.Skill:
                if(this.player.skillSystem.getActiveBonus() === bonus) {
                    this.player.skillSystem.withdrawBonus();
                    // Retirer le bonus de la liste des actifs
                    this.activeBonuses = this.activeBonuses.filter(b => b !== bonus);
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

    public cleanAndStoreAvailableBonuses(): void {
        this.availableBonuses.forEach(bonus => {
            PlayerProfile.getInstance().getInventory().addBonusToInventory(bonus);
        });
        this.availableBonuses = [];
    }
}
