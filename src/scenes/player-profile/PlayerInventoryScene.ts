import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { Menu } from "../../ui/menu/Menu";

export class PlayerInventoryScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const inventory = profile.getInventory();
        const bonusInventory = inventory.getAllBonus();

        const buttonNames = bonusInventory.map(bonus => `${bonus.effect.name}`);
        buttonNames.push('Back to Profile');

        const buttonActions = bonusInventory.map(() => null); // Pas d'action spécifique pour l'instant
        buttonActions.push(() => this.onBackToProfile());

        this.menu = new Menu(buttonNames, buttonActions);
    }

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        return [this.menu];
    }

    cleanup(): void {
        this.menu.cleanup();
    }

    private onBackToProfile(): void {
        SceneManager.getInstance().changeScene(SceneIds.PlayerProfile);
    }
}
