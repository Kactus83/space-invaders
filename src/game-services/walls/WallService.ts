import { Wall } from "../../entities/wall/Wall";
import { AppConfig } from "../../core/config/AppConfig";
import { defenseLineConfigurations } from "./config/WallDefenseConfigurations";
import { WallBlockConfig } from "./types/WallBlockConfig";
import { WallType } from "../../entities/wall/WallType";
import { LineConfig } from "./types/LineConfig";
import { LevelConfiguration } from "./types/LevelConfiguration";
import { PlayerProfile } from "../player-profile/PlayerProfile";

export class WallService {
    private isInitilized: boolean = false;
    private currentWalls: Wall[] = [];
    private newWalls: Wall[] = [];
    private lastLevel: number = -1;

    constructor() {
    }

    public async initialize(): Promise<void> {
        console.log("init wall service");
        // Initialisation anticipée des murs
        await this.prepareAndInitWallsForLevel(PlayerProfile.getInstance().getWalls().getLevel());
        this.isInitilized = true;
    }

    private async prepareAndInitWallsForLevel(level: number): Promise<void> {
        if (level === this.lastLevel) return;
    
        this.lastLevel = level;
        const levelConfig: LevelConfiguration = defenseLineConfigurations[level];
        if (!levelConfig) {
            console.error("No wall configuration found for level", level);
            return;
        }
    
        this.newWalls = []; // Réinitialisation pour le nouveau niveau
        const config = AppConfig.getInstance();
        let startY = config.wall_InitialY; // Y de départ pour la première ligne
    
        for (const lineConfig of levelConfig.defenseConfig.lines) {
            await this.createDefenseLine(lineConfig, startY);
            startY -= config.wall_Size * 5; // Décaler startY pour la prochaine ligne
        }
    }        

    private async createWallBlock(x: number, y: number, config: WallBlockConfig): Promise<void> {
        const wallSize = AppConfig.getInstance().wall_Size;
        
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const wallX = x + col * wallSize;
                const wallY = y + row * wallSize;
                const wall = new Wall(config.type, { x: wallX, y: wallY });
                await wall.init();
                this.newWalls.push(wall);
            }
        }
    }

    private async createDefenseLine(lineConfig: LineConfig, startY: number): Promise<void> {
        const config = AppConfig.getInstance();
        const wallBlockSize = config.wall_Size * 5; // Largeur et hauteur d'un bloc (10 murs de 60 pixels de largeur/hauteur)
        
        let xOffset = 0; // Décalage horizontal pour positionner chaque bloc sur la ligne
        for (const blockConfig of lineConfig.blocks) {
            const xPosition = xOffset;
            const yPosition = startY - wallBlockSize; // Positionner la ligne de défense au-dessus de la startY
            if (blockConfig.type !== WallType.None) {
                await this.createWallBlock(xPosition, yPosition, blockConfig);
            }
            xOffset += wallBlockSize; // Préparer le décalage pour le prochain bloc
        }
    }
    

    public update(deltaTime: number): void {
    }

    public getWallsAndClear(): Wall[] {
        if (this.newWalls.length > 0) {
            this.currentWalls.forEach(wall => wall.cleanup());
            this.currentWalls = [...this.newWalls];
            this.newWalls = [];
        }
        return this.currentWalls;
    }
}
