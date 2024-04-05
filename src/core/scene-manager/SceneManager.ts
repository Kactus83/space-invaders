import { MainMenuScene } from "../../scenes/main-menu/MainMenuScene";
import { SceneIds } from "./types/SceneIds";
import { Renderer } from "../renderer/Renderer";
import { IScene } from "./types/IScene";
import { SettingsScene } from "../../scenes/settings/SettingsScene";
import { GamePlayScene } from "../../scenes/game-play/GameplayScene";
import { GameSettingsScene } from "../../scenes/settings/GameSettingsScene";
import { VictoryScene } from "../../scenes/game-play/VictoryScene";
import { DefeatScene } from "../../scenes/game-play/DefeatScene";
import { PlayerProfileScene } from "../../scenes/player-profile/PlayerProfileScene";
import { PlayerInventoryScene } from "../../scenes/player-profile/PlayerInventoryScene";
import { PlayerGameStatisticsScene } from "../../scenes/player-profile/PlayerGameStatisticsScene";
import { ShopHomeScene } from "../../scenes/shop/ShopHomeScene";
import { ShopSkillsScene } from "../../scenes/shop/ShopSkillsScene";
import { PlayerSkillsScene } from "../../scenes/player-profile/PlayerSkillsScene";

export class SceneManager {
    private static instance: SceneManager;
    private currentScene: IScene | null = null;
    private scenes: Map<SceneIds, IScene> = new Map();
    private renderer: Renderer;

    private constructor() {
        this.renderer = new Renderer();
        this.registerScenes();
    }

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }

    private registerScenes(): void {
        this.scenes.set(SceneIds.MainMenu, new MainMenuScene());
        this.scenes.set(SceneIds.Settings, new SettingsScene());
        this.scenes.set(SceneIds.Victory, new VictoryScene());
        this.scenes.set(SceneIds.Defeat, new DefeatScene());
        this.scenes.set(SceneIds.Settings_Game, new GameSettingsScene());
        this.scenes.set(SceneIds.GamePlay, new GamePlayScene());
        this.scenes.set(SceneIds.PlayerProfile, new PlayerProfileScene());
        this.scenes.set(SceneIds.Player_Inventory, new PlayerInventoryScene());
        this.scenes.set(SceneIds.Player_GameStatistics, new PlayerGameStatisticsScene());
        this.scenes.set(SceneIds.Player_Skills, new PlayerSkillsScene());
        this.scenes.set(SceneIds.Shop, new ShopHomeScene());
        this.scenes.set(SceneIds.Shop_Skills, new ShopSkillsScene());
        
        // Enregistrer d'autres scènes de la même manière
    }

    public async changeScene(sceneId: SceneIds): Promise<void> {
        const newScene = this.scenes.get(sceneId);
        if (!newScene) {
            console.error(`Scene ${sceneId} not found.`);
            return;
        }
        if (this.currentScene) {
            await this.currentScene.cleanup();
        }
        this.currentScene = newScene;
        await this.currentScene.initialize();
    }

    public update(deltaTime: number): void {
        this.currentScene?.update(deltaTime);
    }

    public render(): void {
        if (this.currentScene) {
            const objectsToDraw = this.currentScene.getDrawableObjects();
            this.renderer.clearCanvas();
            this.renderer.draw(objectsToDraw);
        }
    }
}