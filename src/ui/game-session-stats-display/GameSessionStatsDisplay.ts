import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { AppConfig } from "../../core/config/AppConfig";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { GameSessionStats } from "../../game-services/player-profile/experience/models/GameSessionStats";

export class GameSessionStatsDisplay implements IRenderable {
    private fabricObjects: fabric.Object[] = [];
    private gameStats: GameSessionStats | null;

    constructor(sessionIndex?: number) {
        const config = AppConfig.getInstance();
        const profile = PlayerProfile.getInstance();
        const experience = profile.getExperience();
        this.gameStats = sessionIndex !== undefined ? experience.getGameSessionByIndex(sessionIndex) : profile.getLastGameSessionStats();


        if (!this.gameStats) {
            return; // Assurez-vous de gérer le cas où il n'y a pas de statistiques
        }

        // Création d'un fond
        const background = new fabric.Rect({
            left: 0,
            top: 0,
            fill: 'rgba(0, 0, 0, 0.5)', // Semi-transparent pour voir le jeu derrière
            width: config.canvasWidth,
            height: config.canvasHeight,
            selectable: false,
        });
        this.fabricObjects.push(background);

        // Titre du résultat de la session
        const resultText = new fabric.Text(this.gameStats.hasWon ? "Victory!" : "Defeat", {
            left: config.canvasWidth / 2,
            top: config.canvasHeight / 4,
            fontSize: 40,
            fill: this.gameStats.hasWon ? 'green' : 'red',
            fontWeight: 'bold',
            textAlign: 'center',
            originX: 'center',
            selectable: false,
        });
        this.fabricObjects.push(resultText);

        // Texte pour le score final
        const scoreText = new fabric.Text(`Final Score: ${this.gameStats.totalScore}`, {
            left: config.canvasWidth / 2,
            top: config.canvasHeight / 4 + 50,
            fontSize: 30,
            fill: '#FFFFFF',
            textAlign: 'center',
            originX: 'center',
            selectable: false,
        });
        this.fabricObjects.push(scoreText);

        // Texte pour les kills par type d'invader
        let topPosition = config.canvasHeight / 4 + 100;
        Object.entries(this.gameStats.killsByType).forEach(([type, count], index) => {
            const invaderKillsText = new fabric.Text(`${type}: ${count} kills`, {
                left: config.canvasWidth / 2,
                top: topPosition + (index * 30),
                fontSize: 20,
                fill: '#FFFFFF',
                textAlign: 'center',
                originX: 'center',
                selectable: false,
            });
            this.fabricObjects.push(invaderKillsText);
        });
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return this.fabricObjects;
    }
}
