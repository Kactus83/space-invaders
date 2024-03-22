import { Wall } from './Wall';
import { WallType } from './WallType';

export const WallSpecs: Record<WallType, { hp: number, damage: number }> = {
    [WallType.None]: { hp: 0, damage: 0},
    [WallType.Light]: { hp: 1, damage: 1},
    [WallType.Basic]: { hp: 2, damage: 2},
    [WallType.Strong]: { hp: 5, damage: 5},
    [WallType.Invincible]: { hp: Infinity, damage: 10},
    [WallType.Reflective]: { hp: 10, damage: 5},
};
