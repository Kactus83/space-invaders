import { fabric } from 'fabric';
import { ThemeManager } from '../themes/ThemeManager';
import { SceneManager } from '../scenes/SceneManager';
import { Renderer } from '../renderer/Renderer';
import { InputManager } from '../inputs/InputManager';
import { SceneIds } from '../scenes/types/SceneIds';

export class GameEngine {
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
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(timestamp: number): void {
        this.sceneManager.updateCurrentScene(0); // deltaTime n'est pas nécessaire ici mais peut être ajouté si besoin
        this.renderer.clearCanvas();
        this.sceneManager.renderCurrentScene();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}