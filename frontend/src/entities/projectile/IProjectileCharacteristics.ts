import { IHealthCharacteristics } from '../models/health-system/IHealthCharasteristics';
import { ISpeedCharacteristics } from '../models/speed-system/ISpeedCharacteristics';
import { ProjectileType } from './ProjectileType';

export interface IProjectileCharacteristics extends IHealthCharacteristics, ISpeedCharacteristics {
    moveSpeed: number;
    damage: number;
    hp: number;
    shield: number;
    regenerationRate: number;
    projectileType: ProjectileType;
}
