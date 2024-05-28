import { testPlayerProfile } from "../../../config/testPlayerProfile";
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
        // Need API and DB
    }

    loadCurrentProfile(playerName: string): PlayerProfileData | null {
        return testPlayerProfile as unknown as PlayerProfileData;
    }
    
    public deleteProfile(playerName: string): void {
        localStorage.removeItem(`playerProfile_${playerName}`);
    }
}
