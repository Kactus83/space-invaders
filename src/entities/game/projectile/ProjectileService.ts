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

    // Créer un projectile en fonction du niveau du joueur
    public async createProjectileForPlayerLevel(playerLevel: number, x: number, y: number): Promise<void> {
        let projectileType = this.determineProjectileType(playerLevel);
        if (!projectileType) {
            console.error('Invalid player level for projectile creation');
            return;
        }
        const newProjectile = new Projectile(this.themeManager, projectileType, x, y);
        await newProjectile.loadDesign(); 
        this.projectiles.push(newProjectile);
    }

    private determineProjectileType(playerLevel: number): ProjectileType | undefined {
        for (const [type, specs] of Object.entries(ProjectileSpecs)) {
            if (specs.level === playerLevel) {
                return type as ProjectileType;
            }
        }
        return undefined;
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
