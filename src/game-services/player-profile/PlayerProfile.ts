import { PlayerExperience } from "./experience/PlayerExperience";
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

    // Cette méthode pourrait être appelée pour mettre à jour l'expérience après une partie
    addEndGameScore(score: number): void {
        this.experience.updateBestScore(score);
        // Exemple de conversion de score en points d'expérience
        const experienceToAdd = this.calculateExperiencePointsFromScore(score);
        this.experience.addExperiencePoints(experienceToAdd);
    }

    private calculateExperiencePointsFromScore(score: number): number {
        // Implémentez ici la logique de conversion du score en points d'expérience
        return score; // Exemple simple
    }
}
