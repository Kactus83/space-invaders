import { PlayerProfile } from "../PlayerProfile";
import { PlayerProfileData } from "./types/PlayerProfileData";

export class PlayerDataService {
    private static instance: PlayerDataService;

    private constructor() {}

    public static getInstance(): PlayerDataService {
        if (!this.instance) {
            this.instance = new PlayerDataService();
        }
        return this.instance;
    }

    saveCurrentProfile(profile: PlayerProfile): void {
        const playerName = profile.getPlayerName(); 
        const profileData: PlayerProfileData = {
            playerName,
            experience: {
                bestScore: profile.getExperience().getBestScore(),
                experiencePoints: profile.getExperience().getExperiencePoints(),
                gameSessions: profile.getExperience().getAllGameSessions(),
            },
            inventory: {
                bonusInventory: profile.getInventory().getAllBonus(),
            },
            skills: {
                skillIds: profile.getSkills().getSkillsIds(),
            },
            walls: {
                level: profile.getWalls().getLevel(),
            },
            groundLine: {
                level: profile.getGroundLine().getLevel(),
            },
        };

        const profileJson = JSON.stringify(profileData);
        localStorage.setItem(`playerProfile_${playerName}`, profileJson);
    }

    loadCurrentProfile(playerName: string): PlayerProfileData | null {
        const profileJson = localStorage.getItem(`playerProfile_${playerName}`);
        if (profileJson) {
            return JSON.parse(profileJson) as PlayerProfileData;
        }
        return null;
    }
    
    public deleteProfile(playerName: string): void {
        localStorage.removeItem(`playerProfile_${playerName}`);
    }
}
