import { Bonus } from "../../bonus-system/Bonus";
import { BonusTypes } from "../../bonus-system/BonusTypes";
import { HealthBonusEffect } from "./HealthBonusEffect";

export class HealthBonus extends Bonus {
    constructor(effect: HealthBonusEffect) {
        super(BonusTypes.Health, effect);
    }
}