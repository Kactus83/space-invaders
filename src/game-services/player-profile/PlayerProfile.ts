import { PlayerExperience } from "./experience/PlayerExperience";
import { GameSessionStats } from "./experience/models/GameSessionStats";
import { PlayerInventory } from "./inventory/PlayerInventory";

export class PlayerProfile {
    private static instance: PlayerProfile;
    private inventory: PlayerInventory;
    private experience: PlayerExperience;

    private constructor() {
        this.inventory = new PlayerInventory();
        this.experience = new PlayerExperience();
    }

    public static getInstance(): PlayerProfile {
        if (!PlayerProfile.instance) {
            PlayerProfile.instance = new PlayerProfile();
        }
        return PlayerProfile.instance;
    }

    getInventory(): PlayerInventory {
        return this.inventory;
    }

    getExperience(): PlayerExperience {
        return this.experience;
    }

    processGameSession(sessionStats: GameSessionStats): void {
        this.experience.addGameSessionStats(sessionStats);
    }
}
