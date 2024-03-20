import { CollisionService } from '../../../game-services/collisions/CollisionService';
import { ThemeManager } from '../../../themes/ThemeManager';
import { Wall } from './Wall';
import { WallType } from './WallType';
import { fabric } from 'fabric';
import { assembleWallPattern, wallTypeMapping } from './lib/wallConfigurations';
import { config } from '../../../config/config';

export class WallService {
    private walls: Wall[] = [];
    private themeManager: ThemeManager;

    constructor(themeManager: ThemeManager) {
        this.themeManager = themeManager;
    }

    public async initializeWallsForWave(waveKey: string): Promise<void> {
        this.cleanup(); 
        
        const pattern = assembleWallPattern(waveKey);
        let wallCreationPromises: Promise<void>[] = [];
    
        pattern.forEach((row, rowIndex) => {
            row.forEach((typeIndex, colIndex) => {
                if (typeIndex === 0) return; // Ignorer les "None"
                const type = wallTypeMapping[typeIndex];
                const x = config.wallArea.startX + colIndex * 10;
                const y = config.wallArea.startY + rowIndex * 10;
                // Collecter les promesses de création de murs.
                wallCreationPromises.push(this.createWall(type, x, y));
            });
        });
    
        // Attendre la fin de la création de tous les murs.
        await Promise.all(wallCreationPromises);
        console.log(`Initialized walls for wave: ${waveKey}`, this.walls.length, 'walls');
    }
    
    public async createWall(type: WallType, x: number, y: number): Promise<void> {
        if (type === WallType.None) return Promise.resolve();
        const newWall = new Wall(this.themeManager, type, x, y);
        await newWall.loadDesign();
        if (!newWall || !newWall.fabricObject) {
            console.error("Failed to create a wall", {type, x, y});
            throw new Error("Failed to create a wall");
        }
        this.walls.push(newWall);
        return Promise.resolve();
    }    

    public update(deltaTime: number): void {
        // Mise à jour spécifique des murs, si nécessaire
    }

    public getFabricObjects(): fabric.Object[] {
        return this.walls.map(wall => wall.fabricObject);
    }

    public getWalls(): Wall[] {
        return this.walls;
    }

    public applyDamageToWall(wall: Wall, damage: number): boolean {
        const isDestroyed = wall.applyDamage(damage);
        if (isDestroyed) {
            this.removeWall(wall);
        }
        return isDestroyed;
    }

    private removeWall(wallToRemove: Wall): void {
        this.walls = this.walls.filter(wall => wall !== wallToRemove);
    }

    public cleanup(): void {
        this.walls = [];
    }
}
