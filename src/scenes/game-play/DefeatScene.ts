import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { MessageDisplay } from "../../ui/message-display/MessageDisplay";
import { GameSessionStatsDisplay } from "../../ui/game-session-stats-display/GameSessionStatsDisplay";

export class DefeatScene implements IScene {
    private messageDisplay: MessageDisplay;
    private statsDisplay: GameSessionStatsDisplay;

    async initialize(): Promise<void> {
        this.messageDisplay = new MessageDisplay("You lost! Returning to main menu in 10 seconds...");
        this.statsDisplay = new GameSessionStatsDisplay();
        setTimeout(() => {
            SceneManager.getInstance().changeScene(SceneIds.MainMenu);
        }, 10000);
    }

    update(deltaTime: number): void {}
    
    getDrawableObjects(): IRenderable[] {
        return [
            this.messageDisplay,
            this.statsDisplay
        ];
    }
    
    cleanup(): void {}
}
