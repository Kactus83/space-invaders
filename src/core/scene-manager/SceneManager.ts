import { MainMenuScene } from "../../scenes/main-menu/MainMenuScene";
import { SceneIds } from "./types/SceneIds";
import { Renderer } from "../renderer/Renderer";
import { IScene } from "./types/IScene";

export class SceneManager {
    private currentScene: IScene | null = null;
    private scenes: Map<SceneIds, IScene> = new Map();
    private renderer: Renderer;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.registerScenes();
    }

    private registerScenes(): void {
        // Initialiser et enregistrer les scènes ici
        this.scenes.set(SceneIds.MainMenu, new MainMenuScene());
        // Enregistrer d'autres scènes de la même manière
    }

    public async changeScene(sceneId: SceneIds): Promise<void> {
        const newScene = this.scenes.get(sceneId);
        if (!newScene) {
            console.error(`Scene ${sceneId} not found.`);
            return;
        }
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