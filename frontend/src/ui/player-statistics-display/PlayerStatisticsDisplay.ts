import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { AppConfig } from "../../core/config/AppConfig";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";

export class PlayerStatisticsDisplay implements IRenderable {
    private fabricObjects: fabric.Object[] = [];

    constructor() {
        const config = AppConfig.getInstance();
        const profile = PlayerProfile.getInstance();
        const experience = profile.getExperience();

        // Statistiques à afficher
        const totalSessions = experience.getTotalGameSessions();
        const averageScore = experience.getAverageScore().toFixed(2);
        const bestScore = experience.getBestScore();

        // Configuration initiale
        let topPosition = 150;
        const statsTexts = [
            `Total Sessions Played: ${totalSessions}`,
            `Average Score: ${averageScore}`,
            `Best Score: ${bestScore}`,
        ];

        // Fond semi-transparent
        this.fabricObjects.push(new fabric.Rect({
            left: 0,
            top: 0,
            fill: 'rgba(0, 0, 0, 0.75)',
            width: config.canvasWidth,
            height: config.canvasHeight,
            selectable: false,
        }));

        // Titre
        this.fabricObjects.push(new fabric.Text("Player Statistics", {
            left: config.canvasWidth / 2,
            top: 100,
            fontSize: 36,
            fill: '#FFFFFF',
            fontWeight: 'bold',
            textAlign: 'center',
            originX: 'center',
            selectable: false,
        }));

        // Affichage des statistiques
        statsTexts.forEach(text => {
            this.fabricObjects.push(new fabric.Text(text, {
                left: config.canvasWidth / 2,
                top: topPosition,
                fontSize: 24,
                fill: '#FFFFFF',
                textAlign: 'center',
                originX: 'center',
                selectable: false,
            }));
            topPosition += 40;
        });

        // Ajouter des éléments supplémentaires ici, comme des graphiques ou des visualisations des progrès du joueur
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return this.fabricObjects;
    }
}
