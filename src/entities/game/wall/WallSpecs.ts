import { Wall } from './Wall';
import { WallType } from './WallType';

export const WallSpecs: Record<WallType, { hp: number }> = {
    [WallType.Damaged]: { hp: 1 },
    [WallType.Basic]: { hp: 2 },
    [WallType.Strong]: { hp: 5 },
    [WallType.Invincible]: { hp: Infinity },
};
