import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { Menu } from "../../ui/menu/Menu";
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";
import { MessageDisplay } from "../../ui/message-display/MessageDisplay";

export class PlayerInventoryScene implements IScene {
    private verticalMenu: Menu | null = null;
    private horizontalMenu: HorizontalMenu;
    private messageDisplay: IRenderable | null = null; 

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const inventory = profile.getInventory();
        const bonusInventory = inventory.getAllBonus();

        // Création du menu horizontal pour la navigation
        const navigationButtonNames = ["Retour au Profil", "Accéder au Craft"];
        const navigationButtonActions = [
            () => SceneManager.getInstance().changeScene(SceneIds.PlayerProfile),
            () => SceneManager.getInstance().changeScene(SceneIds.Player_BonusCrafting)
        ];
        this.horizontalMenu = new HorizontalMenu(navigationButtonNames, navigationButtonActions);

        if (bonusInventory.length === 0) {
            // Si l'inventaire est vide, initialisez MessageDisplay au lieu de Menu
            this.messageDisplay = new MessageDisplay("No inventory items available.");
        } else {
            // Sinon, continuez avec la logique existante pour afficher l'inventaire
            const bonusCountMap = new Map();
            bonusInventory.forEach(bonus => {
                const name = bonus.effect.name;
                bonusCountMap.set(name, (bonusCountMap.get(name) || 0) + 1);
            });

            const bonusButtonNames = Array.from(bonusCountMap.keys()).map(key => `${key} x${bonusCountMap.get(key)}`);
            this.verticalMenu = new Menu(bonusButtonNames, bonusButtonNames.map(() => null));
        }
    }

    getDrawableObjects(): IRenderable[] {
        const drawables: IRenderable[] = [this.horizontalMenu];
        if (this.verticalMenu) {
            drawables.push(this.verticalMenu);
        }
        if (this.messageDisplay) {
            drawables.push(this.messageDisplay);
        }
        return drawables;
    }

    update(deltaTime: number): void {}

    cleanup(): void {
        this.verticalMenu?.cleanup();
        this.horizontalMenu.cleanup();
    }
}
