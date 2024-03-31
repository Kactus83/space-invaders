import { Bonus } from "../bonus-system/Bonus";
import { BonusType } from "../bonus-system/BonusType";
import { SpeedBonusEffect } from "./SpeedBonusEffect";

export class SpeedBonus extends Bonus {
    constructor(effect: SpeedBonusEffect) {
        super(BonusType.Speed, effect);
    }
}