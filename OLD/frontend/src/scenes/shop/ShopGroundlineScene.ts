import { IScene } from "../../core/scene-manager/types/IScene";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { ExperienceDisplayComponent } from "../../ui/experience-display/ExperienceDisplayComponent";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { IRenderable } from "../../core/renderer/Irenderable";
import { GroundLineLevels } from "../../entities/ground-line/GroundLineLevels";
import { ShopService } from "../../game-services/shop/Shopservice";

export class ShopGroundlineScene implements IScene {
    private menu: Menu;
    private experienceDisplay: ExperienceDisplayComponent;

    async initialize(): Promise<void> {
        this.setupMenu();
        this.experienceDisplay = new ExperienceDisplayComponent();
    }

    private setupMenu() {
        const profile = PlayerProfile.getInstance();
        const currentLevel = profile.getGroundLine().getLevel();
        const experiencePoints = profile.getExperience().getExperiencePoints();
        let buttonNames = [];
        let buttonActions = [];

        Object.entries(GroundLineLevels)
            .forEach(([level, config], index, array) => {
                const levelNum = Number(level);
                if (levelNum === currentLevel + 1) {
                    buttonNames.push(`Level ${level}: ${config.experience_Cost} XP`);
                    if (experiencePoints >= config.experience_Cost) {
                        buttonActions.push(() => this.onGroundLineLevelPurchased(levelNum));
                    } else {
                        buttonActions.push(() => alert(`Not enough experience points. Need: ${config.experience_Cost}`));
                    }
                }
                if (index === array.length - 1 && levelNum === currentLevel) {
                    buttonNames.push("All GroundLine levels purchased");
                    buttonActions.push(() => alert("You have purchased all available GroundLine levels."));
                }
            });

        buttonNames.push('Back to Shop Home');
        buttonActions.push(() => SceneManager.getInstance().changeScene(SceneIds.Shop));

        this.menu = new Menu(buttonNames, buttonActions);
    }

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        return [this.menu, this.experienceDisplay];
    }

    cleanup(): void {
        this.menu.cleanup();
    }

    private onGroundLineLevelPurchased(level: number): void {
        const purchased = ShopService.getInstance().buyGroundLineLevel(level);
        if (purchased) {
            alert("GroundLine level purchased successfully!");
            SceneManager.getInstance().changeScene(SceneIds.Shop_GroundLine); // Assurez-vous que SceneIds contient une référence à Shop_GroundLine
        }
    }
}
