import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";

export class VictoryScene implements IScene {
    async initialize(): Promise<void> {
        console.log("You won! Returning to main menu in 10 seconds...");
        setTimeout(() => {
            SceneManager.getInstance().changeScene(SceneIds.MainMenu);
        }, 10000);
    }

    update(deltaTime: number): void {}
    getDrawableObjects(): IRenderable[] { return []; }
    cleanup(): void {}
}
