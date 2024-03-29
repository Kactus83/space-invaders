import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { Menu } from "../../ui/menu/Menu";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { SceneManager } from "../../core/scene-manager/SceneManager";

export class SettingsScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        // Initialiser les éléments de la scène de paramètres ici, comme un menu de paramètres
        // Par exemple, créer un menu similaire au MainMenu avec des options différentes
        const buttonNames = ['Game', 'Audio', 'Graphics', 'Back'];
        const buttonActions = [this.onGame, this.onAudio, this.onGraphics, this.onBack];

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

    private onGame(): void {
        SceneManager.getInstance().changeScene(SceneIds.Settings_Game);
    }

    private onAudio(): void {
        console.log('Audio settings');
        // Implémenter la logique de modification des paramètres audio
    }

    private onGraphics(): void {
        console.log('Graphics settings');
        // Implémenter la logique de modification des paramètres graphiques
    }

    private onBack(): void {
        console.log('Back to main menu');
        // Retour au menu principal
        SceneManager.getInstance().changeScene(SceneIds.MainMenu);
    }
}