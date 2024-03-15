import { ProjectileType } from './ProjectileType';

export const ProjectileSpecs: Record<ProjectileType, { level: number, speed: number, damage: number }> = {
    [ProjectileType.Basic]: { level: 1, speed: 250, damage: 10 },
    [ProjectileType.Advanced]: { level: 2, speed: 350, damage: 15 },
    [ProjectileType.Ultimate]: { level: 3, speed: 500, damage: 20 },
};
