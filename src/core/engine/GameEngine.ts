import { SceneIds } from "../scene-manager/types/SceneIds";
import { AppConfig } from "../config/AppConfig";
import { IGlobalConfig } from "../config/IGlobalConfig";
import { Renderer } from "../renderer/Renderer";
import { SceneManager } from "../scene-manager/SceneManager";

export class GameEngine {
    private renderer: Renderer;
    private sceneManager: SceneManager;
    private lastFrameTimeMs: number = 0;

    constructor() {
        this.sceneManager = SceneManager.getInstance();
    }

    public async start(): Promise<void> {
        await this.sceneManager.changeScene(SceneIds.MainMenu); // Initialise the main menu scene
        requestAnimationFrame(this.gameLoop.bind(this)); // Start the game loop
    }

    private gameLoop(timestamp: number): void {
        const deltaTime = timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        this.sceneManager.update(deltaTime); // Update the current scene
        this.sceneManager.render(); // Render the current scene

        requestAnimationFrame(this.gameLoop.bind(this)); // Continue the game loop
    }
}
