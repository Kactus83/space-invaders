import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { Menu } from "../../ui/menu/Menu";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { AppConfig } from "../../core/config/AppConfig";

export class GameSettingsScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        this.toggleGodMode = this.toggleGodMode.bind(this);
        this.onBack = this.onBack.bind(this);

        const buttonNames = ['God Mode: ' + (AppConfig.getInstance().god_Mode ? 'On' : 'Off'), 'Back'];
        const buttonActions = [this.toggleGodMode, this.onBack];

        this.menu = new Menu(buttonNames, buttonActions);
    }

    update(deltaTime: number): void {
        // Mettre à jour la logique de la scène si nécessaire
    }

    getDrawableObjects(): IRenderable[] {
        return [this.menu];
    }

    cleanup(): void {
        this.menu.cleanup();
    }

    private toggleGodMode(): void {
        const config = AppConfig.getInstance();
        config.god_Mode = !config.god_Mode; 
        // Mise à jour du texte du bouton pour le mode Dieu
        this.menu.updateButton(0, 'God Mode: ' + (config.god_Mode ? 'On' : 'Off'));
        console.log('God Mode: ' + (config.god_Mode ? 'On' : 'Off'));
    }

    private onBack(): void {
        SceneManager.getInstance().changeScene(SceneIds.Settings);
    }
}
