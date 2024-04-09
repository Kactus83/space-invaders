import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { MessageDisplay } from "../../ui/message-display/MessageDisplay"; // Assurez-vous que le chemin d'importation est correct
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { Menu } from "../../ui/menu/Menu";
import { DualColumnMenu } from "../../ui/menu/DualColumnMenu";
import { ISkill } from "../../entities/models/skill-system/skill/ISkill";

export class PlayerSkillsScene implements IScene {
    private skillsMenu: DualColumnMenu | null = null; // Peut être null si aucun skill n'est disponible
    private horizontalMenu: HorizontalMenu;
    private messageDisplay: MessageDisplay | null = null; // Utilisé pour afficher un message si aucun skill n'est disponible


    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance().getSkills();
        profile.restoreFromData();
        const skills = profile.getSkills();
        const activeSkillsIds = profile.getActiveSkillsIds();

        const navigationButtonNames = ["Retour au Profil", "Accéder à l'Inventaire"];
        const navigationButtonActions = [
            () => SceneManager.getInstance().changeScene(SceneIds.PlayerProfile),
            () => SceneManager.getInstance().changeScene(SceneIds.Player_Inventory)
        ];
        this.horizontalMenu = new HorizontalMenu(navigationButtonNames, navigationButtonActions);

        if (skills.length === 0) {
            // Affichez un message si aucune compétence n'est disponible
            this.messageDisplay = new MessageDisplay("No skills available.");
        } else {
            // Préparez les noms et états pour les boutons du menu DualColumn
            const skillButtonNames = skills.map(skill => skill.name);
            const activeSkillStates = skills.map(skill => activeSkillsIds.includes(skill.id) ? "Active" : "Inactive");
    
            // Initialisez le DualColumnMenu avec les noms de compétences et leurs états
            this.skillsMenu = new DualColumnMenu(skillButtonNames, activeSkillStates, skills.map(skill => () => this.toggleSkill(skill)));
        }
    }

    getDrawableObjects(): IRenderable[] {
        const drawables: IRenderable[] = [this.horizontalMenu];
        if (this.skillsMenu) {
            drawables.push(this.skillsMenu);
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
        this.skillsMenu?.cleanup();
        this.horizontalMenu.cleanup();
    }

    private toggleSkill(skill: ISkill): void {
        const profile = PlayerProfile.getInstance();
        let activeSkills = profile.getSkills().getActiveSkillsIds();
        
        if (activeSkills.includes(skill.id)) {
            activeSkills = activeSkills.filter(id => id !== skill.id); // Retirez la compétence si elle est déjà active
        } else if (activeSkills.length < 10) {
            activeSkills.push(skill.id); // Ajoutez la compétence si moins de 10 sont actives
        }

        // Mettez à jour les compétences actives et rafraîchissez le menu
        profile.getSkills().setActiveSkills(activeSkills);
        this.refreshMenu();
    }

    private refreshMenu(): void {
        if (!this.skillsMenu) return; // Vérifiez si le menu est initialisé

        const profile = PlayerProfile.getInstance();
        const activeSkills = profile.getSkills().getActiveSkills();

        // Mettez à jour les états des boutons de droite pour chaque compétence
        const activeSkillStates = this.skillsMenu.getLeftButtonNames().map(name =>
            activeSkills.find(skill => skill.name === name) ? "Active" : "Inactive"
        );

        // Appliquez les nouveaux états aux boutons de droite
        this.skillsMenu.updateRightButtonStates(activeSkillStates);
    }

    private onBackToProfile(): void {
        SceneManager.getInstance().changeScene(SceneIds.PlayerProfile);
    }
}
