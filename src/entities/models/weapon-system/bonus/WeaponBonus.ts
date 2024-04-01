import { SystemBonus } from "../../bonus-system/system-bonus/SystemBonus";
import { SystemBonusTypes } from "../../bonus-system/system-bonus/SystemBonusTypes";
import { WeaponBonusEffect } from "./WeaponBonusEffect";

export class WeaponBonus extends SystemBonus {
    constructor(effect: WeaponBonusEffect) {
        super(SystemBonusTypes.Weapon, effect);
    }
}