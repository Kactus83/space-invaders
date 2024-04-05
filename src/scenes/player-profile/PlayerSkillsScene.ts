import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";

export class PlayerSkillsScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const skills = profile.getSkills().getSkills();

        const buttonNames = skills.map(skill => `${skill.name}: ${skill.description}`);
        buttonNames.push('Back to Profile');

        const buttonActions = skills.map(() => null); // Pas d'action spécifique pour les compétences
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
