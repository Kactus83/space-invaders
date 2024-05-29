import { PlayerProfileData } from "./datas/types/PlayerProfileData";
import { PlayerExperience } from "./experience/PlayerExperience";
import { PlayerGroundLine } from "./ground-line/PlayerGroundLine";
import { PlayerInventory } from "./inventory/PlayerInventory";
import { PlayerSkills } from "./skills/PlayerSkills";
import { PlayerWalls } from "./walls/PlayerWalls";

export class PlayerProfile {
    private static instance: PlayerProfile;
    private inventory: PlayerInventory;
    private experience: PlayerExperience;
    private skills: PlayerSkills;
    private walls: PlayerWalls;
    private groundLine: PlayerGroundLine;

    private playerName: string;

    private constructor(profileData: PlayerProfileData) {
        this.playerName = profileData.playerName;
        this.inventory = new PlayerInventory(this);
        this.experience = new PlayerExperience(this);
        this.skills = new PlayerSkills(this);
        this.walls = new PlayerWalls(this);
        this.groundLine = new PlayerGroundLine(this);
    }

    public static getInstance(profileData?: PlayerProfileData): PlayerProfile {
        if (!PlayerProfile.instance && profileData) {
            PlayerProfile.instance = new PlayerProfile(profileData);
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

    getWalls(): PlayerWalls {
        return this.walls;
    }

    getGroundLine(): PlayerGroundLine {
        return this.groundLine;
    }
}
