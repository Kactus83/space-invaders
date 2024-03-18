import { playerDesigns } from './lib/PlayerDesigns';
import { invaderDesigns } from './lib/InvaderDesigns';
import { projectileDesigns } from './lib/ProjectileDesigns';
import { WallType } from '../entities/game/wall/WallType';
import { wallDesigns } from './lib/WallDesigns';

export class ThemeManager {
    public getPlayerDesign(level: number) {
        const design = playerDesigns[level];
        if (!design) throw new Error(`Player design not found for level ${level}`);
        return design;
    }

    public getInvaderDesign(type: string) {
        const design = invaderDesigns[type];
        if (!design) throw new Error(`Invader design not found for type ${type}`);
        return design;
    }

    public getProjectileDesign(type: string) {
        const design = projectileDesigns[type];
        if (!design) throw new Error(`Projectile design not found for type ${type}`);
        return design;
    }
    
    public getWallDesign(type: WallType) {
        const design = wallDesigns[type];
        if (!design) throw new Error(`Wall design not found for type ${type}`);
        return design;
    }
}