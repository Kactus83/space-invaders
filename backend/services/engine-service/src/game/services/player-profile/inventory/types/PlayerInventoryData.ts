import { SystemBonus } from "../../../../entities/models/bonus-system/system-bonus/SystemBonus";

export interface PlayerInventoryData {
    // Adapter selon la structure de BonusSystemInventory
    bonusInventory: SystemBonus[]; // Remplacer `any[]` par un type plus spécifique si possible
}