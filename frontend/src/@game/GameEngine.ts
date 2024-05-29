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

    constructor() {
        this.scene = new GamePlayScene();
        this.renderer = new Renderer();
    }

    public async start(canvasElement: HTMLCanvasElement): Promise<void> {
        this.renderer.initialize(canvasElement);
        await this.scene.initialize();
        this.gameLoop();
    }

    private gameLoop(): void {
        setInterval(() => {
            const deltaTime = Date.now() - this.lastFrameTimeMs;
            this.lastFrameTimeMs = Date.now();
            this.scene.update(deltaTime);
            this.render();
        }, 1000 / 60); // Run at 60 FPS
    }

    private render(): void {
        const objectsToDraw = this.scene.getDrawableObjects();
        this.renderer.draw(objectsToDraw);
    }

    public sync(gameState: any): void {
        this.scene.sync(gameState);
    }

    public initializePlayerProfile(profile: FullPlayerProfile): void {
        const playerProfileData: PlayerProfileData = PlayerDataService.getInstance().convertBackendProfile(profile);
        PlayerDataService.getInstance().setProfile(playerProfileData);
        PlayerProfile.getInstance(playerProfileData);
    }
}
