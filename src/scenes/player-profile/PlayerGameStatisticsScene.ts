import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { GameSessionStatsDisplay } from "../../ui/game-session-stats-display/GameSessionStatsDisplay";

export class PlayerGameStatisticsScene implements IScene {
    private statsDisplay: GameSessionStatsDisplay;

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const lastSessionStats = profile.getLastGameSessionStats();

        if(lastSessionStats) {
            this.statsDisplay = new GameSessionStatsDisplay();
        } else {
            // Gérer l'absence de statistiques (par exemple, afficher un message)
        }
    }

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        if(this.statsDisplay) {
            return [this.statsDisplay];
        } else {
            // Retourner un objet de texte indiquant "Aucune statistique disponible"
        }
    }

    cleanup(): void {
        // Nettoyage si nécessaire
    }
}
