import { IScene } from "../../core/scene-manager/types/IScene";
import { Menu } from "../../ui/menu/Menu";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";

export class MainMenuScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        const buttonNames = ['Start Game', 'Player Profile', 'Shop', 'Settings'];
        const buttonActions = [
            this.onStartGame,
            this.onPlayerProfile, 
            this.onShop,
            this.onSettings];

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
        SceneManager.getInstance().changeScene(SceneIds.GamePlay); 
    }
    
    private onShop(): void {
        console.log('Shop');
        SceneManager.getInstance().changeScene(SceneIds.Shop); 
    }
    
    private onSettings(): void {
        console.log('Settings');
        SceneManager.getInstance().changeScene(SceneIds.Settings); 
    }

    private onPlayerProfile(): void {
        SceneManager.getInstance().changeScene(SceneIds.PlayerProfile); 
    }
    
}
