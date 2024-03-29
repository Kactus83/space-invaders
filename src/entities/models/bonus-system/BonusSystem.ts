import { GameEntity } from "../../GameEntity";
import { Bonus } from "../../bonus/Bonus";
import { IBonusCharacteristics } from "../../bonus/IBonusCharacteristics";

export class BonusSystem {
    private static bonuses: Bonus[] = [];

    public static createBonus(characteristics: IBonusCharacteristics, position: { x: number, y: number }): Bonus {
        const bonus = new Bonus(characteristics);
        bonus.init().then(() => {
            //bonus.setPosition(position.x, position.y);
            this.bonuses.push(bonus);
        });
        return bonus;
    }

    public static collectBonus(bonus: Bonus, collector: GameEntity): void {
        const index = this.bonuses.indexOf(bonus);
        if (index !== -1) {
            // Appliquer l'effet du bonus
            //bonus.applyEffect(collector);
            // Supprimer le bonus de la liste
            this.bonuses.splice(index, 1);
        }
    }
    
    public static getBonuses(): Bonus[] {
        return this.bonuses;
    }
}
