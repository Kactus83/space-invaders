import { GroundLine } from "../../entities/ground-line/GroundLine";
import { Wall } from "../../entities/wall/Wall";
import { AppConfig } from "../../core/config/AppConfig";
import { defenseLineConfigurations } from "./config/WallDefenseConfigurations";

export class WallService {
    private groundLine: GroundLine;
    private currentWalls: Wall[] = [];
    private newWalls: Wall[] = [];
    private lastLevel: number = -1; // Initialisé à une valeur non valide pour forcer la première mise à jour

    constructor(groundLine: GroundLine) {
        this.groundLine = groundLine;
        this.initWallsForCurrentLevel();
    }

    private async initWallsForCurrentLevel(): Promise<void> {
        // Vérifie si le niveau de la GroundLine a changé
        if (this.groundLine.level !== this.lastLevel) {
            console.log("Init walls for current level", this.groundLine.level);
            this.newWalls = [];

            const config = AppConfig.getInstance();
            const currentConfig = defenseLineConfigurations.find(config => config.level === this.groundLine.level);

            if (currentConfig) {
                for (let lineIndex = 0; lineIndex < currentConfig.lines.length; lineIndex++) {
                    const line = currentConfig.lines[lineIndex];
                    for (let blockIndex = 0; blockIndex < line.blocks.length; blockIndex++) {
                        const block = line.blocks[blockIndex];
                        for (let i = 0; i < block.count; i++) {
                            const xPosition = blockIndex * (config.canvasWidth / line.blocks.length) + (i * (config.canvasWidth / 10)); // Ajustement pour la largeur du bloc
                            const yPosition = config.wall_initialY - (lineIndex * 60); // Ajustement basé sur lineIndex
                            const wall = new Wall(block.type, { x: xPosition, y: yPosition });
                            await wall.init();
                            this.newWalls.push(wall);
                        }
                    }
                }
            }

            this.lastLevel = this.groundLine.level; // Mise à jour du dernier niveau traité
        }
    }

    public async update(deltaTime: number): Promise<void> {
        await this.initWallsForCurrentLevel();
    }

    public getWallsAndClear(): Wall[] {
        // Si de nouveaux murs ont été créés, retourner ces nouveaux murs et effacer la liste actuelle
        if (this.newWalls.length > 0) {
            this.currentWalls = [...this.newWalls];
            this.newWalls = [];
            return this.currentWalls;
        }

        // Sinon, retourner les murs actuels sans changement
        return this.currentWalls;
    }
}
