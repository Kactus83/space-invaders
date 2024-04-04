import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { GameSessionStatsDisplay } from "../../ui/game-session-stats-display/GameSessionStatsDisplay";
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";

export class PlayerGameStatisticsScene implements IScene {
    
    private menu: HorizontalMenu;
    private statsDisplay: GameSessionStatsDisplay;

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const lastSessionStats = profile.getExperience().getLastGameSessionStats();
        const buttonNames = ['Back to Profile'];
        const buttonActions = [() => this.onBackToProfile()];
        this.menu = new HorizontalMenu(buttonNames, buttonActions);

        if(lastSessionStats) {
            this.statsDisplay = new GameSessionStatsDisplay();
        } else {
            // Gérer l'absence de statistiques (par exemple, afficher un message)
        }
    }

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        if(this.statsDisplay) {
            return [this.statsDisplay, this.menu];
        } else {
            // Retourner un objet de texte indiquant "Aucune statistique disponible"
        }
    }

    cleanup(): void {
        this.menu.cleanup();
    }
    

    private onBackToProfile(): void {
        SceneManager.getInstance().changeScene(SceneIds.PlayerProfile);
    }
}
