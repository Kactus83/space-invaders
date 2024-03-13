import { ProjectileType } from "../../types/ProjectileType";

export interface ProjectileAttributes {
    speed: number;
    damage: number;
}

export const ProjectileTypesAttributes: Record<ProjectileType, ProjectileAttributes> = {
    [ProjectileType.Basic]: { speed: 10, damage: 1 },
    [ProjectileType.Advanced]: { speed: 15, damage: 2 },
    [ProjectileType.Ultimate]: { speed: 20, damage: 3 }
};