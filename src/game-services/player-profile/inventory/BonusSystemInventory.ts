import { SystemBonus } from "../../../entities/models/bonus-system/system-bonus/SystemBonus";
import { ExperienceBonus } from "../../../entities/models/experience-system/bonus/ExperienceBonus";
import { ExperienceBonusEffect } from "../../../entities/models/experience-system/bonus/ExperienceBonusEffect";
import { HealthBonus } from "../../../entities/models/health-system/bonus/HealthBonus";
import { HealthBonusEffect } from "../../../entities/models/health-system/bonus/HealthBonusEffect";
import { SpeedBonus } from "../../../entities/models/speed-system/bonus/SpeedBonus";
import { SpeedBonusEffect } from "../../../entities/models/speed-system/bonus/SpeedBonusEffect";
import { WeaponBonus } from "../../../entities/models/weapon-system/bonus/WeaponBonus";
import { WeaponBonusEffect } from "../../../entities/models/weapon-system/bonus/WeaponBonusEffect";

export class BonusSystemInventory {
    private bonuses: SystemBonus[] = [];


    restoreBonuses(data: any[]): void {
        
        if (!data) {
            console.error("No bonus data available to restore.");
            return;
        }

        this.bonuses = data.map(item => {
            switch (item.type) {
                case 'Health':
                    return new HealthBonus(item.effect as HealthBonusEffect);
                case 'Speed':
                    return new SpeedBonus(item.effect as SpeedBonusEffect);
                case 'Experience':
                    return new ExperienceBonus(item.effect as ExperienceBonusEffect);
                case 'Weapon':
                    return new WeaponBonus(item.effect as WeaponBonusEffect);
                default:
                    throw new Error(`Unknown bonus type: ${item.type}`);
            }
        });
    }

    addBonus(bonus: SystemBonus) {
        this.bonuses.push(bonus);
    }

    removeBonus(bonus: SystemBonus): boolean {
        const index = this.bonuses.findIndex(b => b === bonus);
        if (index !== -1) {
            this.bonuses.splice(index, 1);
            return true;
        }
        return false;
    }

    getBonuses(): SystemBonus[] {
        return this.bonuses;
    }
}