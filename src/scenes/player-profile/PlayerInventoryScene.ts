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

        // Regroupement des bonus par type et comptage
        const bonusCountMap = new Map();
        bonusInventory.forEach(bonus => {
            const name = bonus.effect.name;
            bonusCountMap.set(name, (bonusCountMap.get(name) || 0) + 1);
        });

        // Création des noms de boutons avec quantité pour le menu vertical
        const bonusButtonNames = Array.from(bonusCountMap.keys()).map(key => `${key} x${bonusCountMap.get(key)}`);

        // Initialisation du menu vertical avec les noms de boutons et quantités
        this.verticalMenu = new Menu(bonusButtonNames, bonusButtonNames.map(() => null)); // Aucune action spécifique pour l'instant

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
        return [this.horizontalMenu, this.verticalMenu];
    }

    cleanup(): void {
        this.verticalMenu.cleanup();
        this.horizontalMenu.cleanup();
    }
}
