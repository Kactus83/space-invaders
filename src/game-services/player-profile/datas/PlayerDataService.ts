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

    saveProfile(profile: PlayerProfile): void {
        const profileData: PlayerProfileData = {
            experience: {
                bestScore: profile.getExperience().getBestScore(),
                experiencePoints: profile.getExperience().getExperiencePoints(),
                gameSessions: profile.getExperience().getAllGameSessions(),
            },
            inventory: {
                bonusInventory: profile.getInventory().getBonusInventory().getBonuses(),
            },
        };

        const profileJson = JSON.stringify(profileData);
        localStorage.setItem('playerProfile', profileJson);
    }

    loadProfile(): PlayerProfileData | null {
        const profileJson = localStorage.getItem('playerProfile');
        if (profileJson) {
            return JSON.parse(profileJson) as PlayerProfileData;
        }
        return null;
    }

    // Ajouter ici les méthodes pour manipuler spécifiquement les données sauvegardées
    // par exemple, charger les statistiques de jeu, l'inventaire, etc., séparément si nécessaire
}
