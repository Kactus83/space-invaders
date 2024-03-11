import { playerDesigns } from './playerDesigns';
import { invaderDesigns } from './invaderDesigns';
import { projectileDesigns } from './projectileDesigns';
import { ITheme } from '../ITheme';
import { PlayerDesign, InvaderDesign, ProjectileDesign } from '../../types/Designs';

export class DefaultTheme implements ITheme {
    getPlayerDesign(level: number): PlayerDesign {
        return {
            level: level,
            svgPath: playerDesigns[level]
        };
    }

    getInvaderDesign(type: string): InvaderDesign {
        return {
            type: type,
            svgPath: invaderDesigns[type]
        };
    }

    getProjectileDesign(type: string): ProjectileDesign {
        return {
            type: type,
            svgPath: projectileDesigns[type]
        };
    }
}