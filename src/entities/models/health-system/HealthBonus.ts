import { Bonus } from "../bonus-system/Bonus";
import { BonusType } from "../bonus-system/BonusType";
import { HealthBonusEffect } from "./HealthBonusEffect";

export class HealthBonus extends Bonus {
    constructor(effect: HealthBonusEffect) {
        super(BonusType.Health, effect);
    }
}