import { Skill } from "../../skill/Skill";

export class PickupBonusSkill extends Skill {
    constructor() {
        super("pickupBonus", "Pickup Bonus", "Collect bonuses using projectiles.", 0);
    }

    execute(): void {
        console.log("Executing PickupBonusSkill.");
        // Logic to allow projectiles to collect bonuses
    }
}
