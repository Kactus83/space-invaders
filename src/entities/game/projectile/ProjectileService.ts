import { Projectile } from './Projectile';
import { ThemeManager } from '../../../themes/ThemeManager';
import { ProjectileType } from '../types/ProjectileType';
import { fabric } from 'fabric';
import { ProjectileSpecs } from './ProjectilesTypesSpecs';

export class ProjectileService {
    private projectiles: Projectile[] = [];
    private themeManager: ThemeManager;

    constructor(themeManager: ThemeManager) {
        this.themeManager = themeManager;
    }

    public async createProjectile(type: ProjectileType, x: number, y: number): Promise<void> {
        const newProjectile = new Projectile(this.themeManager, type, x, y);
        await newProjectile.loadDesign();
        this.projectiles.push(newProjectile);
    }

    public update(deltaTime: number): void {
        this.projectiles.forEach((projectile, index) => {
            projectile.update(deltaTime);
            if (projectile.fabricObject.top + projectile.fabricObject.height < 0) {
                this.projectiles.splice(index, 1);
            }
        });
    }

    public getFabricObjects(): fabric.Object[] {
        return this.projectiles.map(projectile => projectile.fabricObject);
    }

    public getProjectiles(): Projectile[] {
        return this.projectiles;
    }

    public removeProjectile(id: number): void{
        this.projectiles = this.projectiles.filter(projectile => projectile.id !== id);
    }

    public cleanup(): void {
        this.projectiles = [];
    }
}
