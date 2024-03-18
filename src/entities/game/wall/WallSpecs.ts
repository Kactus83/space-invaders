import { Wall } from './Wall';
import { WallType } from './WallType';

export const WallSpecs: Record<WallType, { hp: number, damage: number }> = {
    [WallType.Damaged]: { hp: 1, damage: 1},
    [WallType.Basic]: { hp: 2, damage: 2},
    [WallType.Strong]: { hp: 5, damage: 5},
    [WallType.Invincible]: { hp: Infinity, damage: 10},
};
