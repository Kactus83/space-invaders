import { fabric } from 'fabric';
import { ThemeManager } from '../themes/ThemeManager';
import { SceneManager } from '../scenes/SceneManager';
import { Renderer } from '../game-services/renderer/Renderer';
import { InputManager } from '../game-services/inputs/InputManager';
import { SceneIds } from '../scenes/types/SceneIds';

export class GameEngine {
    private lastTimestamp: number = 0;
    private sceneManager: SceneManager;
    private renderer: Renderer;
    private inputManager: InputManager;

    constructor(private canvas: fabric.Canvas, themeManager: ThemeManager) {
        this.renderer = new Renderer(this.canvas);
        this.inputManager = new InputManager();
        this.sceneManager = new SceneManager(this.inputManager, this.renderer, themeManager);

        // Chargez la scène initiale ici, par exemple, MainMenuScene
        this.sceneManager.changeScene(SceneIds.MainMenu);
    }

    public start(): void {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    private gameLoop(timestamp: number): void {
        if (this.lastTimestamp === 0) {
            this.lastTimestamp = timestamp;
        }

        // Calcul de deltaTime en secondes
        const deltaTime = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        this.sceneManager.updateCurrentScene(deltaTime);
        this.renderer.clearCanvas();
        this.sceneManager.renderCurrentScene();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}