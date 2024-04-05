import { ExperienceSystemLevelSet } from "../models/experience-system/types/ExperienceSystemLevelSet";
import { ProjectileType } from "../projectile/ProjectileType";

const PlayerLevels: ExperienceSystemLevelSet = {
    1: {
        level: 1,
        scoreThreshold: 0,
        projectileType: ProjectileType.Light,
        fireRate: 1,
        shootProbability: 1, // Probabilité de 100% pour que le joueur tire à chaque fois
        hp: 3,
        shield: 0,
        damage: 1,
        regenerationRate: 0,
        moveSpeed: 5,
        lifeBonus: 5,
        cooldownRatio: 1
    },
    2: {
        level: 2,
        scoreThreshold: 250,
        projectileType: ProjectileType.Light,
        fireRate: 2,
        shootProbability: 1,
        hp: 4,
        shield: 0,
        damage: 1,
        regenerationRate: 0,
        moveSpeed: 6,
        lifeBonus: 1,
        cooldownRatio: 1
    },
    3: {
        level: 3,
        scoreThreshold: 500,
        projectileType: ProjectileType.Basic,
        fireRate: 1.5,
        shootProbability: 1,
        hp: 5,
        shield: 1,
        damage: 2,
        regenerationRate: 0.1,
        moveSpeed: 7,
        lifeBonus: 2,
        cooldownRatio: 1
    },
    4: {
        level: 4,
        scoreThreshold: 1000,
        projectileType: ProjectileType.Basic,
        fireRate: 2.5,
        shootProbability: 1,
        hp: 6,
        shield: 1,
        damage: 2,
        regenerationRate: 0.1,
        moveSpeed: 8,
        lifeBonus: 4,
        cooldownRatio: 1
    },
    5: {
        level: 5,
        scoreThreshold: 2500,
        projectileType: ProjectileType.Medium,
        fireRate: 2,
        shootProbability: 1,
        hp: 7,
        shield: 2,
        damage: 2,
        regenerationRate: 0.1,
        moveSpeed: 8,
        lifeBonus: 5,
        cooldownRatio: 1
    },
    6: {
        level: 6,
        scoreThreshold: 5000,
        projectileType: ProjectileType.Medium,
        fireRate: 3,
        shootProbability: 1,
        hp: 8,
        shield: 2,
        damage: 2,
        regenerationRate: 0.1,
        moveSpeed: 8,
        lifeBonus: 5,
        cooldownRatio: 1
    },
    7: {
        level: 7,
        scoreThreshold: 10000,
        projectileType: ProjectileType.Advanced,
        fireRate: 2,
        shootProbability: 1,
        hp: 9,
        shield: 3,
        damage: 3,
        regenerationRate: 0.1,
        moveSpeed: 10,
        lifeBonus: 5,
        cooldownRatio: 1
    },
    8: {
        level: 8,
        scoreThreshold: 15000,
        projectileType: ProjectileType.Advanced,
        fireRate: 3,
        shootProbability: 1,
        hp: 10,
        shield: 4,
        damage: 4,
        regenerationRate: 0.1,
        moveSpeed: 11,
        lifeBonus: 5,
        cooldownRatio: 1
    },
    9: {
        level: 9,
        scoreThreshold: 25000,
        projectileType: ProjectileType.Heavy,
        fireRate: 2.5,
        shootProbability: 1,
        hp: 15,
        shield: 4,
        damage: 5,
        regenerationRate: 0.1,
        moveSpeed: 12,
        lifeBonus: 5,
        cooldownRatio: 1
    },
    10: {
        level: 10,
        scoreThreshold: 50000,
        projectileType: ProjectileType.Ultimate,
        fireRate: 2,
        shootProbability: 1,
        hp: 20,
        shield: 5,
        damage: 10,
        regenerationRate: 0.5,
        moveSpeed: 15,
        lifeBonus: 10,
        cooldownRatio: 1
    },
};

export const MaxLevel: number = Object.keys(PlayerLevels).length;

export { PlayerLevels };
