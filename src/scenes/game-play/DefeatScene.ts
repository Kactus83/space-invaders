import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { MessageDisplay } from "../../ui/message-display/MessageDisplay";

export class DefeatScene implements IScene {
    private messageDisplay: MessageDisplay;

    async initialize(): Promise<void> {
        this.messageDisplay = new MessageDisplay("You lost! Returning to main menu in 10 seconds...");
        setTimeout(() => {
            SceneManager.getInstance().changeScene(SceneIds.MainMenu);
        }, 10000);
    }

    update(deltaTime: number): void {}
    
    getDrawableObjects(): IRenderable[] {
        return [this.messageDisplay];
    }
    
    cleanup(): void {}
}
