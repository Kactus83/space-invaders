import { IHealthCharacteristics } from '../models/health-system/IHealthCharasteristics';
import { WallType } from './WallType';

export const WallSpecs: Record<WallType, IHealthCharacteristics> = {
    [WallType.None]: { hp: 0, shield: 0, damage: 0, regenerationRate: 0 },
    [WallType.Light]: { hp: 1, shield: 0, damage: 1, regenerationRate: 0 },
    [WallType.Basic]: { hp: 2, shield: 0, damage: 2, regenerationRate: 0 },
    [WallType.Strong]: { hp: 5, shield: 1, damage: 5, regenerationRate: 0 },
    [WallType.Invincible]: { hp: Infinity, shield: 10, damage: 10, regenerationRate: 0 },
    [WallType.Reflective]: { hp: 10, shield: 2, damage: 5, regenerationRate: 0 },
};
