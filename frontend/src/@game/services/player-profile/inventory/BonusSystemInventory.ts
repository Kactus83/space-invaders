import { SystemBonus } from "../../../entities/models/bonus-system/system-bonus/SystemBonus";

export class BonusSystemInventory {
    private bonuses: SystemBonus[] = [];

    setBonuses(bonuses: SystemBonus[]): void {
        this.bonuses = bonuses;
    }

    addBonus(bonus: SystemBonus): void {
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

    removeBonusAt(index: number): boolean {
        if (index >= 0 && index < this.bonuses.length) {
            this.bonuses.splice(index, 1);
            return true;
        }
        return false;
    }
}
