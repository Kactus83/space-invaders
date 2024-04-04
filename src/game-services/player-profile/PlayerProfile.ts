import { PlayerDataService } from "./datas/PlayerDataService";
import { PlayerExperience } from "./experience/PlayerExperience";
import { GameSessionStats } from "./experience/models/GameSessionStats";
import { PlayerInventory } from "./inventory/PlayerInventory";

export class PlayerProfile {
    private static instance: PlayerProfile;
    private inventory: PlayerInventory;
    private experience: PlayerExperience;
    private dataService: PlayerDataService = PlayerDataService.getInstance();

    private constructor() {
        this.inventory = new PlayerInventory();
        this.experience = new PlayerExperience();
        this.loadProfileData(); // Chargez les données du profil lors de l'initialisation
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
        this.saveProfileData(); // Sauvegardez automatiquement les données après chaque modification
    }
    
    getLastGameSessionStats(): GameSessionStats | null {
        return this.experience.getLastGameSessionStats();
    }

    // Méthode privée pour charger les données de profil
    public loadProfileData(): void {
        const profileData = this.dataService.loadProfile();
        if (profileData) {
            this.experience.restoreFromData(profileData.experience);
            this.inventory.restoreFromData(profileData.inventory);
        }
    }

    // Méthode privée pour sauvegarder les données de profil
    private saveProfileData(): void {
        this.dataService.saveProfile(this);
    }
}
