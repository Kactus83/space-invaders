import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { PlayerProfile } from "../../game-services/player-profile/PlayerProfile";
import { AppConfig } from "../../core/config/AppConfig";

export class ExperienceDisplayComponent implements IRenderable {
    private experiencePointsDisplay: fabric.Text;
    private config: AppConfig;

    constructor() {
        this.config = AppConfig.getInstance();
        this.updateExperiencePoints();
    }

    private updateExperiencePoints(): void {
        const experiencePoints = PlayerProfile.getInstance().getExperience().getExperiencePoints();
        const displayText = `XP Available: ${experiencePoints}`;

        this.experiencePointsDisplay = new fabric.Text(displayText, {
            // Utiliser canvasWidth pour aligner le texte à droite
            left: this.config.canvasWidth - 200, // Soustraire la largeur estimée du texte pour l'aligner à droite
            top: 10,
            fontSize: 20,
            fill: 'white',
            fontFamily: 'Arial',
            selectable: false
        });
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        // Assurez-vous de mettre à jour les points d'expérience à chaque rendu pour refléter les changements
        this.updateExperiencePoints();
        return [this.experiencePointsDisplay];
    }
}
