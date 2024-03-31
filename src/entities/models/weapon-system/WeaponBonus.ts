import { Bonus } from "../bonus-system/Bonus";
import { BonusTypes } from "../bonus-system/BonusTypes";
import { WeaponBonusEffect } from "./WeaponBonusEffect";

export class WeaponBonus extends Bonus {
    constructor(effect: WeaponBonusEffect) {
        super(BonusTypes.Weapon, effect);
    }
}