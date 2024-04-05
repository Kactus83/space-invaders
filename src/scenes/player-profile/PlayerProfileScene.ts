import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { PlayerDataService } from "../../game-services/player-profile/datas/PlayerDataService";

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
            'Reset Data',
            'Back to Main Menu'
        ];
        const buttonActions = [
            null, // Best score et Experience points ne sont pas interactifs
            null, // Mais vous pourriez les rendre interactifs si vous le souhaitez
            () => this.onGameStatistics(),
            () => this.onInventory(),
            () => this.onSkills(),
            () => this.onResetData(), 
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

    private onResetData(): void {
        const profile = PlayerProfile.getInstance();
        const playerName = profile.getPlayerName();
        // Supprimer les données de profil
        PlayerDataService.getInstance().deleteProfile(playerName);
        // Vous pouvez également réinitialiser l'état du profil ici, si nécessaire
        // Par exemple, réinitialiser les scores, l'expérience, l'inventaire, etc.
        alert('Data reset successfully');
        // Optionnellement, rediriger l'utilisateur vers le menu principal ou une autre scène après la réinitialisation
        SceneManager.getInstance().changeScene(SceneIds.MainMenu);
    }
}
