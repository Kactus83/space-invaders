import { IGameScene } from './IGameScene';
import { InputManager } from '../inputs/InputManager';
import { Renderer } from '../renderer/Renderer';
import { ThemeManager } from '../themes/ThemeManager';
import { SceneIds } from './types/SceneIds';
import { MainMenuScene } from './lib/main-menu/MainMenuScene';
import { GamePlayScene } from './lib/gameplay/GamePlayScene';

export class SceneManager {
    private scenes: Map<SceneIds, IGameScene> = new Map();
    private currentScene: IGameScene | null = null;

    constructor(
        private inputManager: InputManager, 
        private renderer: Renderer,
        private themeManager: ThemeManager
    ) {
        this.scenes.set(SceneIds.MainMenu, new MainMenuScene(this, this.renderer, this.themeManager));
        this.scenes.set(SceneIds.GamePlay, new GamePlayScene(this, this.renderer, this.themeManager));
        // Ajoutez d'autres scènes au besoin
    }

    public loadInitialScene(): void {
        this.changeScene(SceneIds.MainMenu);
    }

    public changeScene(sceneId: SceneIds): void {
        const scene = this.scenes.get(sceneId);
        if (!scene) {
            console.error(`Scene ${sceneId} not found.`);
            return;
        }
        this.currentScene?.cleanup();
        this.currentScene = scene;
        this.currentScene.initialize();
    }

    public updateCurrentScene(deltaTime: number): void {
        this.currentScene?.update(deltaTime);
    }

    public renderCurrentScene(): void {
        this.currentScene?.render();
    }
}