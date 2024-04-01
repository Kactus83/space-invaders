import { SystemBonus } from "../../bonus-system/system-bonus/SystemBonus";
import { SystemBonusTypes } from "../../bonus-system/system-bonus/SystemBonusTypes";
import { SpeedBonusEffect } from "./SpeedBonusEffect";

export class SpeedBonus extends SystemBonus {
    constructor(effect: SpeedBonusEffect) {
        super(SystemBonusTypes.Speed, effect);
    }
}