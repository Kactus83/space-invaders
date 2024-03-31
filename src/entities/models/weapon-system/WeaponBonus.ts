import { Bonus } from "../bonus-system/Bonus";
import { BonusType } from "../bonus-system/BonusType";
import { WeaponBonusEffect } from "./WeaponBonusEffect";

export class WeaponBonus extends Bonus {
    constructor(effect: WeaponBonusEffect) {
        super(BonusType.Weapon, effect);
    }
}