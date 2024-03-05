import { ProjectileType } from "../../types/ProjectileType";

export interface ProjectileAttributes {
    speed: number;
    damage: number;
    color: string;
    width: number;
    height: number;
}

export const ProjectileTypesAttributes: Record<ProjectileType, ProjectileAttributes> = {
    [ProjectileType.Basic]: { speed: 10, damage: 1, color: '#FF7467', width: 2, height: 10 },
    [ProjectileType.Advanced]: { speed: 15, damage: 2, color: '#FF9019', width: 3, height: 12 },
    [ProjectileType.Ultimate]: { speed: 20, damage: 3, color: '#FFDD02', width: 4, height: 14 }
};