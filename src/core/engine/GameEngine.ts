import { IGlobalConfig } from "../config/IGlobalConfig";
import { config } from "../config/config";
import { Renderer } from "../renderer/Renderer";
import { SceneManager } from "../scene-manager/SceneManager";

export class GameEngine {

    // Config
    private config: IGlobalConfig = config;

    // Core services
    private renderer: Renderer;
    private sceneManager: SceneManager;

    // Game loop
    private lastFrameTimeMs: number = 0;
    
    constructor() {
        this.renderer = new Renderer(this.config);
        this.sceneManager = new SceneManager(this.renderer);
    }
    /**
     * Start the game loop
     * @returns void
     */
    public start(): void {
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    /**
     * Game loop
     * @param timestamp 
     */
    private gameLoop(timestamp: number): void {

        // Timestamps update
        const deltaTime = timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        // Update and render
        this.sceneManager.update(deltaTime);
        this.sceneManager.render();

        // Loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}