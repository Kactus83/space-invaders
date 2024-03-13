import { PlayerDesign } from './models/PlayerDesign';
import { InvaderDesign } from './models/InvaderDesign';
import { ProjectileDesign } from './models/ProjectileDesign';
import playerDesignsData from './lib/playerDesigns.json'; 
import invaderDesignsData from './lib/invaderDesigns.json';
import projectileDesignsData from './lib/projectileDesigns.json';
import { IDesign } from './types/IDesign';

export class ThemeManager {
    private playerDesigns: Record<number, PlayerDesign> = {};
    private invaderDesigns: Record<string, InvaderDesign> = {};
    private projectileDesigns: Record<string, ProjectileDesign> = {};

    constructor() {
        this.playerDesigns = this.transformDesigns<PlayerDesign>(playerDesignsData, PlayerDesign);
        this.invaderDesigns = this.transformDesigns<InvaderDesign>(invaderDesignsData, InvaderDesign);
        this.projectileDesigns = this.transformDesigns<ProjectileDesign>(projectileDesignsData, ProjectileDesign);
    }

    // Transformation générique des données JSON en instances de design
    private transformDesigns<T extends IDesign>(
        data: any, 
        DesignClass: new (...args: any[]) => T
    ): Record<string | number, T> {
        return Object.keys(data).reduce((acc, key) => {
            const designData = data[key];
            acc[key] = new DesignClass(...Object.values(designData));
            return acc;
        }, {} as Record<string | number, T>);
    }

    public getPlayerDesign(level: number): PlayerDesign {
        const design = this.playerDesigns[level];
        if (!design) throw new Error(`Player design not found for level ${level}`);
        return design;
    }

    public getInvaderDesign(type: string): InvaderDesign {
        const design = this.invaderDesigns[type];
        if (!design) throw new Error(`Invader design not found for type ${type}`);
        return design;
    }

    public getProjectileDesign(type: string): ProjectileDesign {
        const design = this.projectileDesigns[type];
        if (!design) throw new Error(`Projectile design not found for type ${type}`);
        return design;
    }
}