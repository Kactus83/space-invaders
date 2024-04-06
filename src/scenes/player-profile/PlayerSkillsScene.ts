import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { MessageDisplay } from "../../ui/message-display/MessageDisplay"; // Assurez-vous que le chemin d'importation est correct
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { Menu } from "../../ui/menu/Menu";

export class PlayerSkillsScene implements IScene {
    private verticalMenu: Menu | null = null; // Peut être null si aucun skill n'est disponible
    private horizontalMenu: HorizontalMenu;
    private messageDisplay: MessageDisplay | null = null; // Utilisé pour afficher un message si aucun skill n'est disponible

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const skills = profile.getSkills().getSkills();

        // Initialisation du menu horizontal pour la navigation
        const navigationButtonNames = ["Retour au Profil", "Accéder à l'Inventaire"];
        const navigationButtonActions = [
            () => SceneManager.getInstance().changeScene(SceneIds.PlayerProfile),
            () => SceneManager.getInstance().changeScene(SceneIds.Player_Inventory)
        ];
        this.horizontalMenu = new HorizontalMenu(navigationButtonNames, navigationButtonActions);

        if (skills.length === 0) {
            // Si aucun skill n'est disponible, initialisez MessageDisplay
            this.messageDisplay = new MessageDisplay("No skills available.");
        } else {
            // Sinon, continuez avec la logique existante pour afficher les skills
            const skillButtonNames = skills.map(skill => `${skill.name}: ${skill.description}`);
            this.verticalMenu = new Menu(skillButtonNames, skills.map(() => null)); // Pas d'action spécifique pour les compétences
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

    update(deltaTime: number): void {
        // Mise à jour dynamique si nécessaire
    }

    cleanup(): void {
        this.verticalMenu?.cleanup();
        this.horizontalMenu.cleanup();
    }

    private onBackToProfile(): void {
        SceneManager.getInstance().changeScene(SceneIds.PlayerProfile);
    }
}
