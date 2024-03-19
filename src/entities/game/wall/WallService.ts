import { CollisionService } from '../../../collisions/CollisionService';
import { ThemeManager } from '../../../themes/ThemeManager';
import { Wall } from './Wall';
import { WallType } from './WallType';
import { fabric } from 'fabric';
import { level1Pattern, wallTypeMapping } from './lib/wallConfigurations';
import { config } from '../../../config/config';

export class WallService {
    private walls: Wall[] = [];
    private themeManager: ThemeManager;

    constructor(themeManager: ThemeManager) {
        this.themeManager = themeManager;
    }

    public async initializeWallsForLevel(level: string): Promise<void> {
        let pattern;
        if (level === "level1") {
            pattern = level1Pattern;
        } else {
            console.error(`No wall configuration found for level ${level}`);
            return;
        }
    
        (await pattern).forEach((row: number[], rowIndex: number) => {
            row.forEach((typeIndex: number, colIndex: number) => {
                const wallType = wallTypeMapping[typeIndex];
                if (wallType === WallType.None) return;
    
                const x = config.wallArea.startX + colIndex * 10;
                const y = config.wallArea.startY + rowIndex * 10;
                this.createWall(wallType, x, y);
            });
        });
    }

    public createWall(type: WallType, x: number, y: number): void {
        if (type === WallType.None) return;
        const newWall = new Wall(this.themeManager, type, x, y);
        this.walls.push(newWall);
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
}
