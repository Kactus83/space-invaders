import { SceneIds } from "../scene-manager/types/SceneIds";
import { SceneManager } from "../scene-manager/SceneManager";

export class GameEngine {   

    private sceneManager: SceneManager;
    private lastFrameTimeMs: number = 0;

    /**
     * Constructor
     */
    constructor() {
        this.sceneManager = SceneManager.getInstance();
    }

    /**
     * Start the game engine
     */
    public async start(): Promise<void> {
        await this.sceneManager.changeScene(SceneIds.MainMenu); // Initialise the main menu scene
        requestAnimationFrame(this.gameLoop.bind(this)); // Start the game loop
    }

    /**
     * The game loop
     * @param timestamp 
     */
    private gameLoop(timestamp: number): void {
        const deltaTime = timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        this.sceneManager.update(deltaTime); // Update the current scene
        this.sceneManager.render(); // Render the current scene

        requestAnimationFrame(this.gameLoop.bind(this)); // Continue the game loop
    }
}
