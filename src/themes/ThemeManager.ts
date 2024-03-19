import { playerDesigns } from './lib/PlayerDesigns';
import { invaderDesigns } from './lib/InvaderDesigns';
import { projectileDesigns } from './lib/ProjectileDesigns';
import { WallType } from '../entities/game/wall/WallType';
import { wallDesigns } from './lib/WallDesigns';
import { InvaderDesign } from './models/InvaderDesign';
import { InvaderType } from '../entities/game/invader/InvaderType';

export class ThemeManager {
    public getPlayerDesign(level: number) {
        const design = playerDesigns[level];
        if (!design) throw new Error(`Player design not found for level ${level}`);
        return design;
    }

    getInvaderDesign(type: InvaderType, state: 'new' | 'damaged' | 'critical') {
        // On s'assure que les paramètres sont bien des types attendus
        const design = invaderDesigns[type][state];
        if (!design) throw new Error(`Invader design not found for type ${type} and state ${state}`);
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