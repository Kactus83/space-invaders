import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";

export class PlayerSkillsScene implements IScene {
    private verticalMenu: Menu;
    private horizontalMenu: HorizontalMenu;

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const skills = profile.getSkills().getSkills();

        // Initialisation du menu vertical pour l'affichage des compétences
        const skillButtonNames = skills.map(skill => `${skill.name}: ${skill.description}`);
        this.verticalMenu = new Menu(skillButtonNames, skills.map(() => null)); // Pas d'action spécifique pour les compétences

        // Initialisation du menu horizontal pour la navigation
        const navigationButtonNames = ["Retour au Profil", "Accéder à l'Inventaire"];
        const navigationButtonActions = [
            () => SceneManager.getInstance().changeScene(SceneIds.PlayerProfile),
            () => SceneManager.getInstance().changeScene(SceneIds.Player_Inventory)
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
