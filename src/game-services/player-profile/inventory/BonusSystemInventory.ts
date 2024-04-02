import { SystemBonus } from "../../../entities/models/bonus-system/system-bonus/SystemBonus";

export class BonusSystemInventory {
    private bonuses: SystemBonus[] = [];

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