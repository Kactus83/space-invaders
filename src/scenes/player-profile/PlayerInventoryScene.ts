import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { Menu } from "../../ui/menu/Menu";
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";


export class PlayerInventoryScene implements IScene {
    private verticalMenu: Menu;
    private horizontalMenu: HorizontalMenu;

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const inventory = profile.getInventory();
        const bonusInventory = inventory.getAllBonus();

        // Initialisation du menu vertical pour l'affichage des bonus
        const bonusButtonNames = bonusInventory.map(bonus => `${bonus.effect.name}`);
        this.verticalMenu = new Menu(bonusButtonNames, bonusInventory.map(() => null));

        // Initialisation du menu horizontal pour la navigation
        const navigationButtonNames = ["Retour au Profil", "Accéder au Craft"];
        const navigationButtonActions = [
            () => SceneManager.getInstance().changeScene(SceneIds.PlayerProfile),
            () => SceneManager.getInstance().changeScene(SceneIds.Player_BonusCrafting) 
        ];
        this.horizontalMenu = new HorizontalMenu(navigationButtonNames, navigationButtonActions);
    }

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        return [this.verticalMenu, this.horizontalMenu];
    }

    cleanup(): void {
        this.verticalMenu.cleanup();
        this.horizontalMenu.cleanup();
    }
}
