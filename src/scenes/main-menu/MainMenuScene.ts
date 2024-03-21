import { IScene } from "../../core/scene-manager/types/IScene";
import { Menu } from "../../ui/menu/Menu";
import { Button } from "../../ui/button/Button";
import { IRenderable } from "../../core/renderer/Irenderable";

export class MainMenuScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        const buttonNames = ['Start Game', 'Settings'];
        const buttonActions = [this.onStartGame, this.onSettings];

        this.menu = new Menu(buttonNames, buttonActions);
    }

    update(deltaTime: number): void {
        // Mise à jour des animations ou autres éléments de la scène ici
    }

    getDrawableObjects(): IRenderable[] {
        return [this.menu];
    }

    cleanup(): void {
        this.menu.cleanup();
    }
    
    private onStartGame(): void {
        console.log('Start game');
    }

    private onSettings(): void {
        console.log('Settings');
    }
}
