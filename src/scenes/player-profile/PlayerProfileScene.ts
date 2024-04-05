import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";

export class PlayerProfileScene implements IScene {
    private menu: Menu;

    async initialize(): Promise<void> {
        const profile = PlayerProfile.getInstance();
        const experience = profile.getExperience();

        const buttonNames = [
            `Best Score: ${experience.getBestScore()}`,
            `Experience Points: ${experience.getExperiencePoints()}`,
            'Game Statistics',
            'Inventory',
            'Skills',
            'Back to Main Menu'
        ];
        const buttonActions = [
            null, // Best score et Experience points ne sont pas interactifs
            null, // Mais vous pourriez les rendre interactifs si vous le souhaitez
            () => this.onGameStatistics(),
            () => this.onInventory(),
            () => this.onSkills(),
            () => this.onBackToMainMenu()
        ];

        this.menu = new Menu(buttonNames, buttonActions);
    }

    update(deltaTime: number): void {
        // La mise à jour des animations ou autres éléments de la scène peut être gérée ici si nécessaire
    }

    getDrawableObjects(): IRenderable[] {
        return [this.menu];
    }

    cleanup(): void {
        this.menu.cleanup();
    }

    private onGameStatistics(): void {
        SceneManager.getInstance().changeScene(SceneIds.Player_GameStatistics); 
    }

    private onInventory(): void {
        SceneManager.getInstance().changeScene(SceneIds.Player_Inventory); 
    }

    private onSkills(): void {
        SceneManager.getInstance().changeScene(SceneIds.Player_Skills); 
    }

    private onBackToMainMenu(): void {
        SceneManager.getInstance().changeScene(SceneIds.MainMenu);
    }
}
