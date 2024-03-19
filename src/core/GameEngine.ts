import { fabric } from 'fabric';
import { ThemeManager } from '../themes/ThemeManager';
import { SceneManager } from '../scenes/SceneManager';
import { SceneIds } from '../scenes/types/SceneIds';

export class GameEngine {
    private lastTimestamp: number = 0;
    private sceneManager: SceneManager;
    private running: boolean = false; // Ajouté pour contrôler la boucle de jeu

    constructor(private canvas: fabric.Canvas, themeManager: ThemeManager) {
        this.sceneManager = new SceneManager(this.canvas);
        this.sceneManager.changeScene(SceneIds.MainMenu);
    }

    public start(): void {
        this.running = true;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private async gameLoop(timestamp: number): Promise<void> {
        if (!this.running) return;

        if (this.lastTimestamp === 0) {
            this.lastTimestamp = timestamp;
        }

        const deltaTime = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        try {
            await this.sceneManager.updateCurrentScene(deltaTime);
            await this.sceneManager.renderCurrentScene();
        } catch (error) {
            console.error("Game loop error:", error);
            this.running = false; 
            return; 
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public stop(): void {
        this.running = false; 
    }
}
