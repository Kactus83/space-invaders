import { ProjectileType } from './ProjectileType';

export interface IProjectileCharacteristics {
    speed: number;
    damage: number;
    hp: number;
    shield: number;
    regenerationRate: number;
    projectileType: ProjectileType;
}
