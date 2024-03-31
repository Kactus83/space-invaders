import { Bonus } from "../../bonus-system/Bonus";
import { BonusTypes } from "../../bonus-system/BonusTypes";
import { SpeedBonusEffect } from "./SpeedBonusEffect";

export class SpeedBonus extends Bonus {
    constructor(effect: SpeedBonusEffect) {
        super(BonusTypes.Speed, effect);
    }
}