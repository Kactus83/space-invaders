import { IProjectileCharacteristics } from "./IProjectileCharacteristics";
import { ProjectileType } from "./ProjectileType";

export const ProjectileSpecs: Record<ProjectileType, IProjectileCharacteristics> = {
    [ProjectileType.None]: {
        speed: 0, damage: 0, hp: 0, shield: 0, regenerationRate: 0, projectileType: ProjectileType.None
    },
    [ProjectileType.Basic]: {
        speed: 250, damage: 1, hp: 1, shield: 0, regenerationRate: 0, projectileType: ProjectileType.Basic
    },
    [ProjectileType.Advanced]: {
        speed: 350, damage: 2, hp: 2, shield: 0, regenerationRate: 0, projectileType: ProjectileType.Advanced
    },
    [ProjectileType.Ultimate]: {
        speed: 500, damage: 3, hp: 3, shield: 0, regenerationRate: 0, projectileType: ProjectileType.Ultimate
    },
};
