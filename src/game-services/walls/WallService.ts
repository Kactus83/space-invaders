import { GroundLine } from "../../entities/ground-line/GroundLine";
import { Wall } from "../../entities/wall/Wall";
import { AppConfig } from "../../core/config/AppConfig";
import { defenseLineConfigurations } from "./config/WallDefenseConfigurations";

export class WallService {
    private groundLine: GroundLine;
    private currentWalls: Wall[] = [];
    private newWalls: Wall[] = [];
    private lastLevel: number = -1;

    constructor(groundLine: GroundLine) {
        this.groundLine = groundLine;
        // Initiez la préparation des murs pour le niveau actuel dès le démarrage
        this.prepareAndInitWallsForLevel(this.groundLine.level);
    }

    // Préparation et initialisation des murs pour un niveau donné
    private async prepareAndInitWallsForLevel(level: number): Promise<void> {
        // Assurez-vous que nous ne préparons les murs que si le niveau a changé
        if (level === this.lastLevel) return;

        this.lastLevel = level;
        const config = AppConfig.getInstance();
        const currentConfig = defenseLineConfigurations.find(config => config.level === level);
        let wallsToInit: Wall[] = [];

        if (currentConfig) {
            for (let lineIndex = 0; lineIndex < currentConfig.lines.length; lineIndex++) {
                const line = currentConfig.lines[lineIndex];
                for (let blockIndex = 0; blockIndex < line.blocks.length; blockIndex++) {
                    const block = line.blocks[blockIndex];
                    for (let i = 0; i < block.count; i++) {
                        const xPosition = blockIndex * (config.canvasWidth / line.blocks.length) + (i * (config.canvasWidth / 10));
                        const yPosition = config.wall_initialY - (lineIndex * 60);
                        const wall = new Wall(block.type, { x: xPosition, y: yPosition });
                        await wall.init(); // Initialisez le mur avant de l'ajouter à la liste
                        wallsToInit.push(wall);
                    }
                }
            }
        }

        this.newWalls = wallsToInit; // Stockez les nouveaux murs préparés et initialisés
    }

    public update(deltaTime: number): void {
        if (this.groundLine.level !== this.lastLevel) {
            // Si le niveau a changé, préparez et initialisez les nouveaux murs pour le nouveau niveau
            this.prepareAndInitWallsForLevel(this.groundLine.level);
        }
    }

    public getWallsAndClear(): Wall[] {
        if (this.newWalls.length > 0) {
            // Retournez les nouveaux murs préparés et réinitialisez les listes de murs
            let wallsForScene = this.newWalls;
            this.currentWalls = [...this.newWalls];
            this.newWalls = [];
            return wallsForScene;
        }
        // Si aucun nouveau mur n'est prêt, continuez à utiliser les murs actuels
        return this.currentWalls;
    }
}
