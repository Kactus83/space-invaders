import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";

export class ShopHomeScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        const buttonNames = [
            'Skills Shop',
            'Walls Shop', 
            'Back to Main Menu'
        ];
        const buttonActions = [
            () => SceneManager.getInstance().changeScene(SceneIds.Shop_Skills),
            () => SceneManager.getInstance().changeScene(SceneIds.Shop_Walls),
            () => SceneManager.getInstance().changeScene(SceneIds.MainMenu)
        ];

        this.menu = new Menu(buttonNames, buttonActions);
        
    }

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        return [this.menu];
    }

    cleanup(): void {
        this.menu.cleanup();
    }
}
