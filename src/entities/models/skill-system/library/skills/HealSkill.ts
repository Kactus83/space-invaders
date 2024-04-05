import { Skill } from "../../skill/Skill";

export class HealSkill extends Skill {
    constructor() {
        super("heal", "Heal", "Heals the player by 50% of max health.", 60000); // 60 sec cooldown
    }

    execute(): void {
        console.log("Executing HealSkill.");
        // Logic to heal the player
        this.resetCooldown(); // Start cooldown
    }
}
