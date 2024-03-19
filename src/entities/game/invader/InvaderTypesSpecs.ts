import { ProjectileType } from "../projectile/ProjectileType";
import { InvaderType } from "./InvaderType";

export const InvaderSpecs: Record<InvaderType, { hp: number, speed: number, score: number, damage: number, projectileType: ProjectileType, fireRate: number, shootProbability?: number }> = {
    [InvaderType.None]: { hp: 0, speed: 0, score: 0, damage: 0, projectileType: ProjectileType.None, fireRate: 0},
    [InvaderType.Light]: { hp: 1, speed: 200, score: 25, damage: 1, projectileType: ProjectileType.None, fireRate: 0, shootProbability: 0},
    [InvaderType.Basic]: { hp: 1, speed: 130, score: 10, damage: 1, projectileType: ProjectileType.Basic, fireRate: 0.1, shootProbability: 0.01},
    [InvaderType.Advanced]: { hp: 2, speed: 100, score: 20, damage: 2, projectileType: ProjectileType.Basic, fireRate: 0.1, shootProbability: 0.02},
    [InvaderType.Strong]: { hp: 5, speed: 50, score: 30, damage: 4, projectileType: ProjectileType.None, fireRate: 0, shootProbability: 0},
    [InvaderType.Elite]: { hp: 3, speed: 70, score: 50, damage: 5, projectileType: ProjectileType.Advanced, fireRate: 0.1, shootProbability: 0.05},
    [InvaderType.Boss]: { hp: 10, speed: 35, score: 250, damage: 15, projectileType: ProjectileType.Ultimate, fireRate: 0.1, shootProbability: 0.02},
};