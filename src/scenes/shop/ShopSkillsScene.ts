import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { SkillLibrary } from "../../entities/models/skill-system/library/SkillLibrary";
import { ShopService } from "../../game-services/shop/Shopservice";

export class ShopSkillsScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        const skills = SkillLibrary.getAllSkills();

        const buttonNames = skills.map(skill => `${skill.name}: ${skill.experiencePointsCost} XP`);
        buttonNames.push('Back to Shop Home');

        const buttonActions = skills.map(skill => () => {
            const purchased = ShopService.getInstance().buySkill(skill.id);
            if (purchased) {
                alert(`Skill "${skill.name}" acquired!`);
            } else {
                alert("Not enough experience points or skill does not exist.");
            }
        });
        buttonActions.push(() => SceneManager.getInstance().changeScene(SceneIds.Shop));

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
