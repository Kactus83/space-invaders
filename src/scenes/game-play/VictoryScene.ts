import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { MessageDisplay } from "../../ui/message-display/MessageDisplay";
import { GameSessionStatsDisplay } from "../../ui/game-session-stats-display/GameSessionStatsDisplay";

export class VictoryScene implements IScene {
    private messageDisplay: MessageDisplay;
    private statsDisplay: GameSessionStatsDisplay;
    private displayStats: boolean = false; // Contrôle l'affichage des stats

    async initialize(): Promise<void> {
        this.messageDisplay = new MessageDisplay("You won! Returning to main menu in 10 seconds...");
        this.statsDisplay = new GameSessionStatsDisplay();

        setTimeout(() => {
            this.displayStats = true; // Commencer à afficher les stats après 3 secondes
        }, 3000);

        setTimeout(() => {
            SceneManager.getInstance().changeScene(SceneIds.MainMenu); // Retour au menu principal après 10 secondes
        }, 10000);
    }

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        if (this.displayStats) {
            return [this.statsDisplay];
        } else {
            return [this.messageDisplay];
        }
    }

    cleanup(): void {}
}
