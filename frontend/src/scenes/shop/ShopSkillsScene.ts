import { IScene } from "../../core/scene-manager/types/IScene";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { SkillLibrary } from "../../entities/models/skill-system/library/SkillLibrary";
import { ExperienceDisplayComponent } from "../../ui/experience-display/ExperienceDisplayComponent";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { SkillsIds } from "../../entities/models/skill-system/types/SkillsIds";
import { IRenderable } from "../../core/renderer/Irenderable";
import { ShopService } from "../../game-services/shop/Shopservice";

export class ShopSkillsScene implements IScene {
    private menu: Menu;
    private experienceDisplay: ExperienceDisplayComponent;

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        // Obtenir toutes les compétences disponibles dans la bibliothèque
        let skills = SkillLibrary.getAllSkills();
        // Obtenir les identifiants des compétences possédées par le joueur
        const ownedSkillsIds = profile.getSkills().getSkillsIds();
    
        // Filtrer pour exclure les compétences possédées
        skills = skills.filter(skill => !ownedSkillsIds.includes(skill.id));
    
        // Ensuite, exclure les compétences enfants si le parent n'est pas possédé
        skills = skills.filter(skill => {
            // Si la compétence a un parentSkillId, vérifier si le parent est possédé
            return !skill.parentSkillId || ownedSkillsIds.includes(skill.parentSkillId);
        });
    
        // Préparer les noms de boutons et les actions
        const buttonNames = skills.map(skill => `${skill.name}: ${skill.experiencePointsCost} XP`);
        buttonNames.push('Back to Shop Home');
    
        const buttonActions = skills.map(skill => () => this.onSkillPurchased(skill.id));
        buttonActions.push(() => SceneManager.getInstance().changeScene(SceneIds.Shop));
    
        // Initialiser le menu et l'affichage de l'expérience
        this.menu = new Menu(buttonNames, buttonActions);
        this.experienceDisplay = new ExperienceDisplayComponent();
    }    

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        return [this.menu, this.experienceDisplay];
    }

    cleanup(): void {
        this.menu.cleanup();
    }

    private onSkillPurchased(skillId: SkillsIds): void {
        const purchased = ShopService.getInstance().buySkill(skillId);
        if (purchased) {
            SceneManager.getInstance().changeScene(SceneIds.Shop_Skills);
        } else {
            alert("Not enough experience points or skill already owned.");
        }
    }
}
