import { GameBonusType } from "../../../entities/bonus/GameBonusTypes";
import { GameBonusSpecs } from "../../../entities/bonus/GameBonusTypesSpecs";
import { SystemBonus } from "../../../entities/models/bonus-system/system-bonus/SystemBonus";
import { ExperienceBonus } from "../../../entities/models/experience-system/bonus/ExperienceBonus";
import { ExperienceBonusEffect } from "../../../entities/models/experience-system/bonus/ExperienceBonusEffect";
import { HealthBonus } from "../../../entities/models/health-system/bonus/HealthBonus";
import { HealthBonusEffect } from "../../../entities/models/health-system/bonus/HealthBonusEffect";
import { SkillBonus } from "../../../entities/models/skill-system/bonus/SkillBonus";
import { SkillBonusEffect } from "../../../entities/models/skill-system/bonus/SkillBonusEffect";
import { SpeedBonus } from "../../../entities/models/speed-system/bonus/SpeedBonus";
import { SpeedBonusEffect } from "../../../entities/models/speed-system/bonus/SpeedBonusEffect";
import { WeaponBonus } from "../../../entities/models/weapon-system/bonus/WeaponBonus";
import { WeaponBonusEffect } from "../../../entities/models/weapon-system/bonus/WeaponBonusEffect";
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


    addBonusByType(bonusType: GameBonusType): void {
        // Créer l'instance de bonus basée sur le type et l'ajouter à l'inventaire
        const bonus = this.createBonusFromType(bonusType);
        if (bonus) {
            this.bonusInventory.addBonus(bonus);
        }
        PlayerDataService.getInstance().saveCurrentProfile(this.playerProfile);
    }

    removeBonusByType(bonusType: GameBonusType): boolean {
        // Trouver le bonus par type et le supprimer
        const index = this.bonusInventory.getBonuses().findIndex(bonus => bonus.effect.name === bonusType);
        if (index !== -1) {
            return this.bonusInventory.removeBonusAt(index);
        }
        return false;
    }

    private createBonusFromType(bonusType: GameBonusType): SystemBonus | null {
        // Utilisez GameBonusSpecs pour créer une instance de bonus basée sur le type
        const specs = GameBonusSpecs[bonusType];
        if (!specs) return null;

        switch (specs.systemBonus.constructor) {
            case HealthBonus:
                return new HealthBonus(specs.systemBonus.effect as HealthBonusEffect);
            case SpeedBonus:
                return new SpeedBonus(specs.systemBonus.effect as SpeedBonusEffect);
            case WeaponBonus:
                return new WeaponBonus(specs.systemBonus.effect as WeaponBonusEffect);
            case ExperienceBonus:
                return new ExperienceBonus(specs.systemBonus.effect as ExperienceBonusEffect);      
            case SkillBonus:
                return new SkillBonus(specs.systemBonus.effect as SkillBonusEffect);
            default:
                return null;
        }
    }

    // Placeholders pour d'autres systèmes d'inventaire futurs
}