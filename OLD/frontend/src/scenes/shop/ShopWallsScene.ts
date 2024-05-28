import { IScene } from "../../core/scene-manager/types/IScene";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { ExperienceDisplayComponent } from "../../ui/experience-display/ExperienceDisplayComponent";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { defenseLineConfigurations } from "../../game-services/walls/config/WallDefenseConfigurations";
import { ShopService } from "../../game-services/shop/Shopservice";
import { IRenderable } from "../../core/renderer/Irenderable";

export class ShopWallsScene implements IScene {
    private menu: Menu;
    private experienceDisplay: ExperienceDisplayComponent;

    async initialize(): Promise<void> {
        this.setupMenu();
        this.experienceDisplay = new ExperienceDisplayComponent();
    }

    private setupMenu() {
        const profile = PlayerProfile.getInstance();
        const currentLevel = profile.getWalls().getLevel();
        const experiencePoints = profile.getExperience().getExperiencePoints();
        let buttonNames = [];
        let buttonActions = [];

        Object.entries(defenseLineConfigurations)
            .forEach(([level, config], index, array) => {
                const levelNum = Number(level);
                // Afficher le niveau suivant, même si le joueur n'a pas assez d'XP
                if (levelNum === currentLevel + 1) {
                    buttonNames.push(`Level ${level}: ${config.experienceCost} XP`);
                    if (experiencePoints >= config.experienceCost) {
                        buttonActions.push(() => this.onWallLevelPurchased(levelNum));
                    } else {
                        buttonActions.push(() => alert(`Not enough experience points. Need: ${config.experienceCost}`));
                    }
                }
                // Si le joueur a atteint le niveau maximum
                if (index === array.length - 1 && levelNum === currentLevel) {
                    buttonNames.push("All wall levels purchased");
                    buttonActions.push(() => alert("You have purchased all available wall levels."));
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

    private onWallLevelPurchased(level: number): void {
        const purchased = ShopService.getInstance().buyWallLevel(level);
        if (purchased) {
            alert("Wall level purchased successfully!");
            SceneManager.getInstance().changeScene(SceneIds.Shop_Walls); 
        }
    }
}
