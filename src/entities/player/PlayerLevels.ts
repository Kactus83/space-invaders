import { ProjectileType } from "../projectile/ProjectileType";

export const PlayerLevels: Record<string, { 
    scoreThreshold: number; 
    projectileType: ProjectileType; 
    fireRate: number; 
    shield: number; 
    moveSpeed: number;
    lifeBonus: number;
}> = {
    '1': { scoreThreshold: 0, projectileType: ProjectileType.Basic, fireRate: 1, shield: 0, moveSpeed: 2, lifeBonus: 5 },
    '2': { scoreThreshold: 50, projectileType: ProjectileType.Basic, fireRate: 1.75, shield: 0, moveSpeed: 2, lifeBonus: 1 },
    '3': { scoreThreshold: 250, projectileType: ProjectileType.Basic, fireRate: 2.5, shield: 1, moveSpeed: 2, lifeBonus: 2 },
    '4': { scoreThreshold: 500, projectileType: ProjectileType.Advanced, fireRate: 1.75, shield: 1, moveSpeed: 2, lifeBonus: 3 },
    '5': { scoreThreshold: 1000, projectileType: ProjectileType.Advanced, fireRate: 2, shield: 1, moveSpeed: 2, lifeBonus: 4 },
    '6': { scoreThreshold: 1500, projectileType: ProjectileType.Advanced, fireRate: 2.5, shield: 1, moveSpeed: 2, lifeBonus: 5 },
    '7': { scoreThreshold: 2500, projectileType: ProjectileType.Ultimate, fireRate: 1.75, shield: 2, moveSpeed: 2, lifeBonus: 5 },
    '8': { scoreThreshold: 4000, projectileType: ProjectileType.Ultimate, fireRate: 2, shield: 2, moveSpeed: 2, lifeBonus: 5 },
    '9': { scoreThreshold: 7000, projectileType: ProjectileType.Ultimate, fireRate: 2.5, shield: 3, moveSpeed: 2, lifeBonus: 5 },
    '10': { scoreThreshold: 10000, projectileType: ProjectileType.Ultimate, fireRate: 2, shield: 3, moveSpeed: 2, lifeBonus: 5 },
};

export const MaxLevel = Object.keys(PlayerLevels).length;
