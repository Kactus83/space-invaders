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

    /**
     * Sauvegarde les données du profil du joueur actuel dans le localStorage.
     */
    saveCurrentProfile(): void {
        const profile = PlayerProfile.getInstance();
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
        };

        const profileJson = JSON.stringify(profileData);
        localStorage.setItem(`playerProfile_${playerName}`, profileJson);
    }

    /**
     * Charge les données du profil du joueur actuel depuis le localStorage.
     * @returns {PlayerProfileData | null} - Les données du profil du joueur ou null si aucune donnée n'est trouvée.
     */
    loadCurrentProfile(): PlayerProfileData | null {
        const profile = PlayerProfile.getInstance();
        const playerName = profile.getPlayerName(); // Supposons que cette méthode existe.
        const profileJson = localStorage.getItem(`playerProfile_${playerName}`);
        if (profileJson) {
            return JSON.parse(profileJson) as PlayerProfileData;
        }
        return null;
    }
}
