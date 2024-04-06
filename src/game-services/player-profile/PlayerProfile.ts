import { PlayerDataService } from "./datas/PlayerDataService";
import { PlayerExperience } from "./experience/PlayerExperience";
import { GameSessionStats } from "./experience/models/GameSessionStats";
import { PlayerInventory } from "./inventory/PlayerInventory";
import { PlayerSkills } from "./skills/PlayerSkills";
import { PlayerWalls } from "./walls/PlayerWalls";

export class PlayerProfile {
    private static instance: PlayerProfile;
    private inventory: PlayerInventory;
    private experience: PlayerExperience;
    private skills: PlayerSkills;
    private walls: PlayerWalls;

    private playerName: string = 'Player';

    private constructor() {
        this.inventory = new PlayerInventory(this);
        this.experience = new PlayerExperience(this);
        this.skills = new PlayerSkills(this);
        this.walls = new PlayerWalls(this);
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
    
    setPlayerName(name: string): void {
        this.playerName = name;
        this.experience.restoreFromData();
        this.inventory.restoreFromData();
        this.skills.restoreFromData();
        this.walls.restoreFromData();
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

    getWalls(): PlayerWalls {
        return this.walls;
    }

}
