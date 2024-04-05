import { Skill } from "../../skill/Skill";

export class SpeedBoostSkill extends Skill {
    constructor() {
        super("speedBoost", "Speed Boost", "Double speed for a short duration.", 60000); // 60 sec cooldown
    }

    execute(): void {
        console.log("Executing SpeedBoostSkill.");
        // Logic to double speed
        this.resetCooldown(); // Start cooldown
    }
}
