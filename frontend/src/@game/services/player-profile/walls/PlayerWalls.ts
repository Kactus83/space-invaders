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
    }

    getLevel(): number {
        return this.level;
    }

    restoreFromData(): void {
        // Tenter de charger les données de profil du joueur
        const profileData = PlayerDataService.getInstance().getProfile();
        if (profileData && profileData.walls) {
            this.level = profileData.walls.level;
        }
    }
}