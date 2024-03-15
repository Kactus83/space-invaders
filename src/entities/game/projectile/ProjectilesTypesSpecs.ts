import { ProjectileType } from './ProjectileType';

export const ProjectileSpecs: Record<ProjectileType, { level: number, speed: number, damage: number }> = {
    [ProjectileType.Basic]: { level: 1, speed: 5, damage: 10 },
    [ProjectileType.Advanced]: { level: 2, speed: 7, damage: 15 },
    [ProjectileType.Ultimate]: { level: 3, speed: 10, damage: 20 },
};
