import { ITheme } from '../ITheme';
import { PlayerDesign, InvaderDesign, ProjectileDesign } from '../../types/Designs';
import { playerDesigns } from './playerDesigns';
import { invaderDesigns } from './invaderDesigns';
import { projectileDesigns } from './projectileDesigns';
import { ProjectileType } from '../../types/ProjectileType';
import { InvaderType } from '../../types/InvaderType';


export class DefaultTheme implements ITheme {
    getPlayerDesign(level: number): PlayerDesign {
        const key = level.toString();
        const design = playerDesigns[key as unknown as keyof typeof playerDesigns];
        if (!design) {
            throw new Error(`Player design not found for level ${level}`);
        }
        return {
            level,
            svgPath: design.svgPath,
            color: design.color,
            width: design.width, 
            height: design.height 
        };
    }

    getInvaderDesign(type: InvaderType): InvaderDesign {
        const design = invaderDesigns[type];
        if (!design) {
            throw new Error(`Invader design not found for type ${type}`);
        }
        return {
            type: type.toString(),
            svgPath: design.svgPath,
            color: design.color,
            width: design.width, 
            height: design.height 
        };
    }

    getProjectileDesign(type: ProjectileType): ProjectileDesign {
        const design = projectileDesigns[type];
        if (!design) {
            throw new Error(`Projectile design not found for type ${type}`);
        }
        return {
            type: type.toString(),
            svgPath: design.svgPath,
            color: design.color,
            width: design.width, 
            height: design.height 
        };
    }
}
