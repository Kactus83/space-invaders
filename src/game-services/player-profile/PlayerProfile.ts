import { PlayerDataService } from "./datas/PlayerDataService";
import { PlayerExperience } from "./experience/PlayerExperience";
import { GameSessionStats } from "./experience/models/GameSessionStats";
import { PlayerInventory } from "./inventory/PlayerInventory";
import { PlayerSkills } from "./skills/PlayerSkills";

export class PlayerProfile {
    private static instance: PlayerProfile;
    private inventory: PlayerInventory;
    private experience: PlayerExperience;
    private skills: PlayerSkills;

    private playerName: string = 'Player';

    private constructor() {
        this.inventory = new PlayerInventory(this);
        this.experience = new PlayerExperience(this);
        this.skills = new PlayerSkills(this);
    }

    public static getInstance(): PlayerProfile {
        if (!PlayerProfile.instance) {
            PlayerProfile.instance = new PlayerProfile();
        }
        return PlayerProfile.instance;
    }

    getPlayerName(): string {
        return this.playerName;
    }

    getInventory(): PlayerInventory {
        return this.inventory;
    }

    getExperience(): PlayerExperience {
        return this.experience;
    }

    getSkills(): PlayerSkills {
        return this.skills;
    }

}
