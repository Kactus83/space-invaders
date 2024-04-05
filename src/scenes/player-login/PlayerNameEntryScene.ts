import { IScene } from "../../core/scene-manager/types/IScene";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { IRenderable } from "../../core/renderer/Irenderable";

export class PlayerNameEntryScene implements IScene {
    constructor() {}

    async initialize(): Promise<void> {
        const inputElement = document.getElementById('playerNameInput');
        if (inputElement) {
            inputElement.style.display = 'block'; // Affichez le champ de saisie
            inputElement.focus(); // Mettez le focus dessus
    
            inputElement.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const inputElement = document.getElementById('playerNameInput') as HTMLInputElement;
                    const playerName = inputElement.value.trim();

                    if (playerName) {
                        PlayerProfile.getInstance().setPlayerName(playerName);
                    } else {
                        PlayerProfile.getInstance().setPlayerName("Player"); // Nom par défaut
                    }

                    inputElement.style.display = 'none'; // Cachez le champ après la saisie

                    // Changez de scène
                    SceneManager.getInstance().changeScene(SceneIds.MainMenu);
                }
            }, { once: true }); // Assurez-vous que l'événement est écouté une seule fois
        }
    }
    

    update(deltaTime: number): void {

    }

    getDrawableObjects(): IRenderable[] {
        // Aucun objet à dessiner pour cette scène
        return [];
    }

    cleanup(): void {
        const inputElement = document.getElementById('playerNameInput');
        if (inputElement) {
            inputElement.style.display = 'none'; // Cachez ou enlevez l'élément du DOM si préféré
            // Exemple pour l'enlever : inputElement.parentNode.removeChild(inputElement);
        }
    }
}
