import { PlayerDesign, InvaderDesign, ProjectileDesign } from '../types/Designs';

export interface ITheme {
    getPlayerDesign(level: number): PlayerDesign;
    getInvaderDesign(type: string): InvaderDesign;
    getProjectileDesign(type: string): ProjectileDesign;
}