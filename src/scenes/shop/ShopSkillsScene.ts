import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { SkillLibrary } from "../../entities/models/skill-system/library/SkillLibrary";
import { ShopService } from "../../game-services/shop/Shopservice";
import { ExperienceDisplayComponent } from "../../ui/experience-display/ExperienceDisplayComponent";
import { SkillsIds } from "../../entities/models/skill-system/types/SkillsIds";


export class ShopSkillsScene implements IScene {
    private menu: Menu;
    private experienceDisplay: ExperienceDisplayComponent;

    async initialize(): Promise<void> {
        const skills = SkillLibrary.getAllSkills();

        const buttonNames = skills.map(skill => `${skill.name}: ${skill.experiencePointsCost} XP`);
        buttonNames.push('Back to Shop Home');

        const buttonActions = skills.map(skill => () => this.onSkillPurchased(skill.id));
        buttonActions.push(() => SceneManager.getInstance().changeScene(SceneIds.Shop));

        this.menu = new Menu(buttonNames, buttonActions);
        this.experienceDisplay = new ExperienceDisplayComponent();
    }

    update(deltaTime: number): void {
    }

    getDrawableObjects(): IRenderable[] {
        return [this.menu, this.experienceDisplay];
    }

    cleanup(): void {
        this.menu.cleanup();
    }

    private onSkillPurchased(skillId: SkillsIds): void {
        const purchased = ShopService.getInstance().buySkill(skillId);
        if (purchased) {
            alert(`Skill "${skillId}" acquired!`);
        } else {
            alert("Not enough experience points or skill does not exist.");
        }
    }
}
