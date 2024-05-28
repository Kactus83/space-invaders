import { IProjectileCharacteristics } from "./IProjectileCharacteristics";
import { ProjectileType } from "./ProjectileType";

export const ProjectileSpecs: Record<ProjectileType, IProjectileCharacteristics> = {
    [ProjectileType.None]: {
        moveSpeed: 0, damage: 0, hp: 0, shield: 0, regenerationRate: 0, projectileType: ProjectileType.None
    },
    [ProjectileType.Light]: {
        moveSpeed: 200, damage: 1, hp: 1, shield: 0, regenerationRate: 0, projectileType: ProjectileType.Light
    },
    [ProjectileType.Basic]: {
        moveSpeed: 250, damage: 2, hp: 1, shield: 0, regenerationRate: 0, projectileType: ProjectileType.Basic
    },
    [ProjectileType.Medium]: {
        moveSpeed: 300, damage: 3, hp: 2, shield: 0, regenerationRate: 0, projectileType: ProjectileType.Medium
    },
    [ProjectileType.Advanced]: {
        moveSpeed: 350, damage: 5, hp: 2, shield: 0, regenerationRate: 0, projectileType: ProjectileType.Advanced
    },
    [ProjectileType.Heavy]: {
        moveSpeed: 400, damage: 7, hp: 3, shield: 0, regenerationRate: 0, projectileType: ProjectileType.Heavy
    },
    [ProjectileType.Ultimate]: {
        moveSpeed: 500, damage: 10, hp: 5, shield: 1, regenerationRate: 0, projectileType: ProjectileType.Ultimate
    },
};
