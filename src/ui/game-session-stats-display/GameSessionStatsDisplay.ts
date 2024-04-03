import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { AppConfig } from "../../core/config/AppConfig";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";

export class GameSessionStatsDisplay implements IRenderable {
    private fabricObjects: fabric.Object[] = [];

    constructor() {
        const config = AppConfig.getInstance();
        const profile = PlayerProfile.getInstance();
        const gameStats = profile.getLastGameSessionStats(); // Assurez-vous d'implémenter cette méthode dans PlayerProfile

        // Créez des objets de texte fabric pour chaque statistique
        const statsTexts = [
            `Final Score: ${gameStats.totalScore}`,
            `Invaders Killed: ${Object.entries(gameStats.killsByType)
                .map(([type, count]) => `${type}: ${count}`)
                .join(', ')}`,
            gameStats.hasWon ? "Victory!" : "Defeat"
        ];

        // Position initiale pour l'affichage
        let topPosition = 100;
        statsTexts.forEach((text) => {
            const fabricText = new fabric.Text(text, {
                left: config.canvasWidth / 2,
                top: topPosition,
                fontSize: 20,
                fill: '#FFFFFF',
                textAlign: 'center',
                originX: 'center',
                selectable: false,
            });
            this.fabricObjects.push(fabricText);
            topPosition += 30; // Espacement entre chaque ligne de statistiques
        });
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return this.fabricObjects;
    }
}
