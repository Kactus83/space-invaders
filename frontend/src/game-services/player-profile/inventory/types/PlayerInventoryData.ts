import { SystemBonus } from "../../../../entities/models/bonus-system/system-bonus/SystemBonus";

export interface PlayerInventoryData {
    // Adaptez selon la structure de BonusSystemInventory
    bonusInventory: SystemBonus[]; // Remplacez `any[]` par un type plus spécifique si possible
}