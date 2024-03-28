import { ProjectileType } from "../projectile/ProjectileType";
import { IInvaderCharacteristics } from "./IInvaderCharacteristics";
import { InvaderType } from "./InvaderType";

export const InvaderSpecs: Record<InvaderType, IInvaderCharacteristics> = {
    [InvaderType.None]: {
        type: InvaderType.None,
        speed: 0,
        score: 0,
        hp: 0,
        shield: 0,
        damage: 0,
        regenerationRate: 0,
        projectileType: ProjectileType.None,
        fireRate: 0,
        shootProbability: 0,
    },
    [InvaderType.Light]: {
        type: InvaderType.Light,
        speed: 100,
        score: 10,
        hp: 1,
        shield: 0,
        damage: 1,
        regenerationRate: 0,
        projectileType: ProjectileType.None,
        fireRate: 1,
        shootProbability: 0,
    },
    [InvaderType.Basic]: {
        type: InvaderType.Basic,
        speed: 80,
        score: 20,
        hp: 2,
        shield: 0,
        damage: 1,
        regenerationRate: 0.1,
        projectileType: ProjectileType.Basic,
        fireRate: 2,
        shootProbability: 0.004,
    },
    [InvaderType.Advanced]: {
        type: InvaderType.Advanced,
        speed: 60,
        score: 30,
        hp: 3,
        shield: 1,
        damage: 2,
        regenerationRate: 0.2,
        projectileType: ProjectileType.Advanced,
        fireRate: 3,
        shootProbability: 0.004,
    },
    [InvaderType.Strong]: {
        type: InvaderType.Strong,
        speed: 40,
        score: 40,
        hp: 5,
        shield: 2,
        damage: 3,
        regenerationRate: 0.3,
        projectileType: ProjectileType.Advanced,
        fireRate: 4,
        shootProbability: 0.001,
    },
    [InvaderType.Elite]: {
        type: InvaderType.Elite,
        speed: 30,
        score: 50,
        hp: 7,
        shield: 3,
        damage: 4,
        regenerationRate: 0.4,
        projectileType: ProjectileType.Ultimate,
        fireRate: 5,
        shootProbability: 0.001,
    },
    [InvaderType.Boss]: {
        type: InvaderType.Boss,
        speed: 20,
        score: 100,
        hp: 10,
        shield: 4,
        damage: 5,
        regenerationRate: 0.5,
        projectileType: ProjectileType.Ultimate,
        fireRate: 6,
        shootProbability: 0.01,
    },
};
