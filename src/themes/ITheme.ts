import { PlayerDesign, InvaderDesign, ProjectileDesign } from '../types/Designs';
import { InvaderType } from '../types/InvaderType';
import { ProjectileType } from '../types/ProjectileType';

export interface ITheme {
    getPlayerDesign(level: number): PlayerDesign;
    getInvaderDesign(type: InvaderType): InvaderDesign;
    getProjectileDesign(type: ProjectileType): ProjectileDesign;
}