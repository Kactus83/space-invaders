import { IGameScene } from './IGameScene';
import { InputManager } from '../game-services/inputs/InputManager';
import { Renderer } from '../game-services/renderer/Renderer';
import { ThemeManager } from '../themes/ThemeManager';
import { SceneIds } from './types/SceneIds';
import { MainMenuScene } from './lib/main-menu/MainMenuScene';
import { GamePlayScene } from './lib/gameplay/GamePlayScene';
import { GameWinScene } from './lib/gameplay/GameWinScene';
import { GameLoseScene } from './lib/gameplay/GameLoseScene';

export class SceneManager {
    private scenes: Map<SceneIds, IGameScene> = new Map();
    private currentScene: IGameScene | null = null;
    private inputManager: InputManager = new InputManager();
    private themeManager: ThemeManager = new ThemeManager();
    private renderer: Renderer;

    constructor(canvas: fabric.Canvas) 
    {
        this.renderer = new Renderer(canvas);        
        this.scenes.set(SceneIds.MainMenu, new MainMenuScene(this, this.renderer, this.themeManager));
        this.scenes.set(SceneIds.GamePlay, new GamePlayScene(this, this.renderer, this.themeManager, this.inputManager));
        this.scenes.set(SceneIds.GameWin, new GameWinScene(this, this.renderer, this.themeManager));
        this.scenes.set(SceneIds.GameLose, new GameLoseScene(this, this.renderer, this.themeManager));
        // Ajoutez d'autres scènes au besoin
    }

    public async loadInitialScene(): Promise<void> {
        await this.changeScene(SceneIds.MainMenu);
    }

    public async changeScene(sceneId: SceneIds): Promise<void> {
        const scene = this.scenes.get(sceneId);
        if (scene) {
            await this.currentScene?.cleanup();
            this.currentScene = scene;
            await this.currentScene.initialize();
        } else {
            console.error(`Scene ${sceneId} not found.`);
        }
    }

    public updateCurrentScene(deltaTime: number): void {
        this.currentScene?.update(deltaTime);
    }

    public renderCurrentScene(): void {
        this.currentScene?.render();
    }
}