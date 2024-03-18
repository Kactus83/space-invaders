import { CollisionService } from '../../../collisions/CollisionService';
import { ThemeManager } from '../../../themes/ThemeManager';
import { Wall } from './Wall';
import { WallType } from './WallType';
import { fabric } from 'fabric';

export class WallService {
    private walls: Wall[] = [];
    private themeManager: ThemeManager;

    constructor(themeManager: ThemeManager) {
        this.themeManager = themeManager;
    }
    public initializeWalls(): void {
        this.createWall(WallType.Basic, 100, 450);
        this.createWall(WallType.Basic, 110, 450);
        this.createWall(WallType.Basic, 120, 450);
        this.createWall(WallType.Strong, 130, 450);
        this.createWall(WallType.Basic, 140, 450);
        this.createWall(WallType.Basic, 150, 450);
        this.createWall(WallType.Basic, 160, 450);
        this.createWall(WallType.Basic, 100, 440);
        this.createWall(WallType.Basic, 110, 440);
        this.createWall(WallType.Basic, 120, 440);
        this.createWall(WallType.Strong, 130, 440);
        this.createWall(WallType.Basic, 140, 440);
        this.createWall(WallType.Basic, 150, 440);
        this.createWall(WallType.Basic, 160, 440);
        this.createWall(WallType.Basic, 300, 450);
        this.createWall(WallType.Basic, 310, 450);
        this.createWall(WallType.Basic, 320, 450);
        this.createWall(WallType.Strong, 330, 450);
        this.createWall(WallType.Basic, 340, 450);
        this.createWall(WallType.Basic, 350, 450);
        this.createWall(WallType.Basic, 360, 450);
        this.createWall(WallType.Basic, 300, 440);
        this.createWall(WallType.Basic, 310, 440);
        this.createWall(WallType.Basic, 320, 440);
        this.createWall(WallType.Strong, 330, 440);
        this.createWall(WallType.Basic, 340, 440);
        this.createWall(WallType.Basic, 350, 440);
        this.createWall(WallType.Basic, 360, 440);
    }

    public createWall(type: WallType, x: number, y: number): void {
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
