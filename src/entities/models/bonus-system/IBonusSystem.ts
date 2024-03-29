import { Bonus } from "../../bonus/Bonus";
import { Invader } from "../../invader/Invader";
import { Player } from "../../player/Player";

export interface IBonusSystem {
    addBonus(bonus: Bonus): void;
    useBonus(player: Player): void;
    createBonusForInvader(invader: Invader): void;
}
