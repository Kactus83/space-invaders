import { PlayerProfile } from "../PlayerProfile";
import { PlayerDataService } from "../datas/PlayerDataService";

export class PlayerWalls {
    level: number;

    constructor(private playerProfile: PlayerProfile) {
        this.level = 1; // Valeur par défaut
        this.restoreFromData();
    }

    setLevel(level: number): void {
        this.level = level;
        // Après avoir mis à jour le niveau, sauvegardez immédiatement le profil du joueur
        PlayerDataService.getInstance().saveCurrentProfile(this.playerProfile);
    }

    getLevel(): number {
        return this.level;
    }

    restoreFromData(): void {
        // Tentez de charger les données de profil du joueur
        const profileData = PlayerDataService.getInstance().loadCurrentProfile(this.playerProfile.getPlayerName());
        if (profileData && profileData.walls) {
            // Restaurez le niveau des murs à partir des données chargées
            this.setLevel(profileData.walls.level);
        }
    }
}