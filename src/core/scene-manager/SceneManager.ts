import { Renderer } from "../renderer/Renderer";
import { IScene } from "./types/IScene";

export class SceneManager {
    private currentScene: IScene | null = null;
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    public async changeScene(newScene: IScene): Promise<void> {
        if (this.currentScene) {
            await this.currentScene.cleanup();
        }
        this.currentScene = newScene;
        await this.currentScene.initialize();
    }

    public update(deltaTime: number): void {
        this.currentScene?.update(deltaTime);
    }

    public render(): void {
        if (this.currentScene) {
            const objectsToDraw = this.currentScene.getDrawableObjects();
            this.renderer.clearCanvas();
            this.renderer.draw(objectsToDraw);
        }
    }
}