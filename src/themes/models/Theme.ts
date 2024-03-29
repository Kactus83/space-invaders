import { InvaderType } from "../../entities/invader/InvaderType";
import { ProjectileType } from "../../entities/projectile/ProjectileType";
import { WallType } from "../../entities/wall/WallType";
import { IDesign } from "../types/IDesign";

export class Theme {
    private invaderDesigns: Record<InvaderType, Record<string, IDesign>>;
    private playerDesigns: Record<number, IDesign>;
    private groundLineDesigns: Record<number, IDesign>;
    private projectileDesigns: Record<ProjectileType, IDesign>;
    private wallDesigns: Record<WallType, IDesign>;

    constructor(invaderDesigns: Record<InvaderType, Record<string, IDesign>>, 
                playerDesigns: Record<number, IDesign>, 
                groundLineDesigns: Record<number, IDesign>,
                projectileDesigns: Record<ProjectileType, IDesign>, 
                wallDesigns: Record<WallType, IDesign>) {
        this.invaderDesigns = invaderDesigns;
        this.playerDesigns = playerDesigns;
        this.groundLineDesigns = groundLineDesigns;
        this.projectileDesigns = projectileDesigns;
        this.wallDesigns = wallDesigns;
    }

    public getInvaderDesign(type: InvaderType, state: 'new' | 'damaged' | 'critical'): IDesign {
        const design = this.invaderDesigns[type][state];
        if (!design) throw new Error(`Invader design not found for type ${type} and state ${state}`);
        return design;
    }

    public getPlayerDesign(level: number): IDesign {
        const design = this.playerDesigns[level];
        if (!design) throw new Error(`Player design not found for level ${level}`);
        return design;
    }

    public getGroundLineDesign(level: number): IDesign {
        const design = this.groundLineDesigns[level];
        if (!design) throw new Error(`GroundLine design not found for level ${level}`);
        return design;
    }

    public getProjectileDesign(type: ProjectileType): IDesign {
        const design = this.projectileDesigns[type];
        if (!design) throw new Error(`Projectile design not found for type ${type}`);
        return design;
    }

    public getWallDesign(type: WallType): IDesign {
        const design = this.wallDesigns[type];
        if (!design) throw new Error(`Wall design not found for type ${type}`);
        return design;
    }
}
