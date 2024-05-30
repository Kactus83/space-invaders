import { GamePlayScene } from "./GameplayScene";
import { Renderer } from "./services/renderer/Renderer";
import { PlayerProfile } from "./services/player-profile/PlayerProfile";
import { FullPlayerProfile } from "app/core/player/player-profile.types";
import { PlayerProfileData } from "./services/player-profile/datas/types/PlayerProfileData";
import { PlayerDataService } from "./services/player-profile/datas/PlayerDataService";

export class GameEngine {
    private lastFrameTimeMs: number = 0;
    private scene: GamePlayScene;
    private renderer: Renderer;
    private intervalId: NodeJS.Timeout;

    constructor() {
        this.renderer = new Renderer();
    }

    /**
     * Initializes and starts the game engine.
     * 
     * @param canvasElement The HTML canvas element to be used for rendering the game.
     */
    public async start(canvasElement: HTMLCanvasElement): Promise<void> {
        this.renderer.initialize(canvasElement);
        this.scene = new GamePlayScene();
        await this.scene.initialize();
        this.startGameLoop();
    }

    /**
     * Starts the game loop using setInterval for consistent frame updates.
     */
    private startGameLoop(): void {
        this.intervalId = setInterval(() => {
            const deltaTime = Date.now() - this.lastFrameTimeMs;
            this.lastFrameTimeMs = Date.now();
            this.scene.update(deltaTime);
            this.render();
        }, 1000 / 60); // Run at 60 FPS
    }

    /**
     * Renders the current state of the game scene.
     */
    private render(): void {
        const objectsToDraw = this.scene.getDrawableObjects();
        this.renderer.draw(objectsToDraw);
    }

    /**
     * Synchronizes the game state with the provided state.
     * 
     * @param gameState The state to synchronize with.
     */
    public sync(gameState: any): void {
        this.scene.sync(gameState);
    }

    /**
     * Initializes the player profile with data from the backend.
     * 
     * @param profile The player profile data from the backend.
     */
    public initializePlayerProfile(profile: FullPlayerProfile): void {
        const playerProfileData: PlayerProfileData = PlayerDataService.getInstance().convertBackendProfile(profile);
        PlayerDataService.getInstance().setProfile(playerProfileData);
        PlayerProfile.getInstance();
    }

    /**
     * Stops the game loop.
     */
    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

