import { ProjectileType } from "../projectile/ProjectileType";

export const PlayerLevels: Record<string, { scoreThreshold: number; projectileType: ProjectileType; fireRate: number; shield: number }> = {
    '1': { scoreThreshold: 0, projectileType: ProjectileType.Basic, fireRate: 1, shield: 0 },
    '2': { scoreThreshold: 100, projectileType: ProjectileType.Basic, fireRate: 1.75, shield: 0 },
    '3': { scoreThreshold: 250, projectileType: ProjectileType.Advanced, fireRate: 1.75, shield: 1 },
    '4': { scoreThreshold: 500, projectileType: ProjectileType.Advanced, fireRate: 2.5, shield: 1 },
    '5': { scoreThreshold: 1000, projectileType: ProjectileType.Ultimate, fireRate: 2.5, shield: 2 },
};

export const MaxLevel = Object.keys(PlayerLevels).length;
