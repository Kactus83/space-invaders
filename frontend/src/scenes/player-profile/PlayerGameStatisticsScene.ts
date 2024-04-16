import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { IScene } from "../../core/scene-manager/types/IScene";
import { MessageDisplay } from "../../ui/message-display/MessageDisplay";
import { GameSessionStatsDisplay } from "../../ui/game-session-stats-display/GameSessionStatsDisplay";

export class PlayerGameStatisticsScene implements IScene {
    private menu: HorizontalMenu;
    private statsDisplay: IRenderable | null = null; // Utilisez IRenderable pour uniformiser les types

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const lastSessionStats = profile.getExperience().getLastGameSessionStats();
        const buttonNames = ['Back to Profile'];
        const buttonActions = [() => this.onBackToProfile()];
        this.menu = new HorizontalMenu(buttonNames, buttonActions);

        // Si aucune statistique n'est disponible, utilisez MessageDisplay pour afficher un message
        if (!lastSessionStats) {
            this.statsDisplay = new MessageDisplay("No statistics data available.");
        } else {
            this.statsDisplay = new GameSessionStatsDisplay();
        }
    }

    getDrawableObjects(): IRenderable[] {
        const drawables: IRenderable[] = [this.menu];
        if (this.statsDisplay) {
            drawables.push(this.statsDisplay);
        }
        return drawables;
    }

    update(deltaTime: number): void {
        
    }

    cleanup(): void {
        this.menu.cleanup();
    }

    private onBackToProfile(): void {
        SceneManager.getInstance().changeScene(SceneIds.PlayerProfile);
    }
}
