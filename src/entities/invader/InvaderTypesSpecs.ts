import { GameBonusType } from "../bonus/GameBonusTypes";
import { ProjectileType } from "../projectile/ProjectileType";
import { IInvaderCharacteristics } from "./IInvaderCharacteristics";
import { InvaderType } from "./InvaderType";

/**
 * Invader characteristics for each invader type.
 */
export const InvaderSpecs: Record<InvaderType, IInvaderCharacteristics> = {
    [InvaderType.None]: {
        type: InvaderType.None,
        width: 0,
        height: 0,
        moveSpeed: 0,
        score: 0,
        hp: 0,
        shield: 0,
        damage: 0,
        regenerationRate: 0,
        projectileType: ProjectileType.None,
        fireRate: 0,
        shootProbability: 0,
        emitProbability: 0,
        bonusTypes: [],
    },
    [InvaderType.Light]: {
        type: InvaderType.Light,
        width: 30,
        height: 30,
        moveSpeed: 150,
        score: 10,
        hp: 1,
        shield: 0,
        damage: 1,
        regenerationRate: 0,
        projectileType: ProjectileType.None,
        fireRate: 1,
        shootProbability: 0,
        emitProbability: 0.08,
        bonusTypes: [GameBonusType.Speed_Increase_5_Speed_60sec],
    },
    [InvaderType.Basic]: {
        type: InvaderType.Basic,
        width: 40,
        height: 40,
        moveSpeed: 80,
        score: 20,
        hp: 2,
        shield: 0,
        damage: 1,
        regenerationRate: 0.1,
        projectileType: ProjectileType.Light,
        fireRate: 2,
        shootProbability: 0.002,
        emitProbability: 0.04,
        bonusTypes: [GameBonusType.Health_Increase_1_Shield_60sec],
    },
    [InvaderType.Medium]: {
        type: InvaderType.Medium,
        width: 40,
        height: 40,
        moveSpeed: 80,
        score: 30,
        hp: 4,
        shield: 0,
        damage: 2,
        regenerationRate: 0.3,
        projectileType: ProjectileType.Basic,
        fireRate: 4,
        shootProbability: 0.0035,
        emitProbability: 0.01,
        bonusTypes: [GameBonusType.Weapon_Increase_05_FireRate_60sec, GameBonusType.Experience_Increase_1_Level, GameBonusType.Experience_Increase_500_Score],
    },
    [InvaderType.Fast]: {
        type: InvaderType.Fast,
        width: 30,
        height: 30,
        moveSpeed: 250,
        score: 30,
        hp: 2,
        shield: 0,
        damage: 1,
        regenerationRate: 0,
        projectileType: ProjectileType.None,
        fireRate: 0,
        shootProbability: 0,
        emitProbability: 0.08,
        bonusTypes: [GameBonusType.Experience_Increase_500_Score, GameBonusType.Speed_Increase_10_Speed_60sec, GameBonusType.Speed_Double_Speed_30sec],
    },
    [InvaderType.Fast_Kamikaze]: {
        type: InvaderType.Fast_Kamikaze,
        width: 30,
        height: 30,
        moveSpeed: 320,
        score: 30,
        hp: 1,
        shield: 1,
        damage: 25,
        regenerationRate: 0,
        projectileType: ProjectileType.Light,
        fireRate: 5,
        shootProbability: 0.02,
        emitProbability: 0.1,
        bonusTypes: [GameBonusType.Experience_Increase_500_Score, GameBonusType.Experience_Increase_1000_Score, GameBonusType.Speed_Double_Speed_30sec],
    },
    [InvaderType.Strong]: {
        type: InvaderType.Strong,
        width: 60,
        height: 60,
        moveSpeed: 40,
        score: 40,
        hp: 7,
        shield: 1,
        damage: 3,
        regenerationRate: 0.3,
        projectileType: ProjectileType.Medium,
        fireRate: 4,
        shootProbability: 0.0001,
        emitProbability: 0.02,
        bonusTypes: [GameBonusType.Health_Increase_2_Shield_60sec],
    },
    [InvaderType.Advanced]: {
        type: InvaderType.Advanced,
        width: 50,
        height: 50,
        moveSpeed: 60,
        score: 30,
        hp: 5,
        shield: 1,
        damage: 2,
        regenerationRate: 0.2,
        projectileType: ProjectileType.Advanced,
        fireRate: 3,
        shootProbability: 0.0004,
        emitProbability: 0.01,
        bonusTypes: [GameBonusType.Weapon_Double_FireRate_5sec, GameBonusType.Experience_Double_Score_60sec, GameBonusType.Experience_Increase_500_Score],
    },
    [InvaderType.Heavy]: {
        type: InvaderType.Heavy,
        width: 60,
        height: 60,
        moveSpeed: 30,
        score: 40,
        hp: 15,
        shield: 3,
        damage: 5,
        regenerationRate: 0.2,
        projectileType: ProjectileType.Advanced,
        fireRate: 3,
        shootProbability: 0.0001,
        emitProbability: 0.1,
        bonusTypes: [GameBonusType.Health_Increase_5_Shield_60sec],
    },
    [InvaderType.Specialized]: {
        type: InvaderType.Specialized,
        width: 50,
        height: 50,
        moveSpeed: 60,
        score: 30,
        hp: 7,
        shield: 2,
        damage: 4,
        regenerationRate: 0.2,
        projectileType: ProjectileType.Advanced,
        fireRate: 5,
        shootProbability: 0.0008,
        emitProbability: 0.01,
        bonusTypes: [GameBonusType.Weapon_Increase_1_FireRate_60sec, GameBonusType.Experience_Double_Score_60sec, GameBonusType.Health_Double_Shield_30sec, GameBonusType.Speed_Double_Speed_30sec, GameBonusType.Speed_Increase_20_Speed_60sec, GameBonusType.Experience_Increase_1_Level, GameBonusType.Experience_Increase_500_Score, GameBonusType.Experience_Increase_1000_Score, GameBonusType.Health_Increase_1_Shield_60sec, GameBonusType.Health_Increase_2_Shield_60sec, GameBonusType.Health_Increase_5_Shield_60sec, GameBonusType.Weapon_Increase_05_FireRate_60sec, GameBonusType.Weapon_Double_FireRate_5sec, GameBonusType.Experience_Increase_1_Level, GameBonusType.Experience_Increase_500_Score, GameBonusType.Experience_Increase_1000_Score, GameBonusType.Speed_Double_Speed_30sec, GameBonusType.Speed_Increase_5_Speed_60sec],
    },
    [InvaderType.Elite]: {
        type: InvaderType.Elite,
        width: 55,
        height: 55,
        moveSpeed: 60,
        score: 50,
        hp: 12,
        shield: 3,
        damage: 7,
        regenerationRate: 0.4,
        projectileType: ProjectileType.Heavy,
        fireRate: 5,
        shootProbability: 0.0005,
        emitProbability: 0.05,
        bonusTypes: [GameBonusType.Weapon_Double_Firerate_10sec, GameBonusType.Experience_Double_Score_60sec],
    },
    [InvaderType.Light_Boss]: {
        type: InvaderType.Light_Boss,
        width: 80,
        height: 80,
        moveSpeed: 20,
        score: 100,
        hp: 20,
        shield: 2,
        damage: 10,
        regenerationRate: 0.3,
        projectileType: ProjectileType.Medium,
        fireRate: 4,
        shootProbability: 0.0001,
        emitProbability: 0.02,
        bonusTypes: [GameBonusType.Health_Increase_2_Shield_60sec, GameBonusType.Weapon_Double_FireRate_5sec, GameBonusType.Experience_Increase_1_Level],
    },
    [InvaderType.Boss]: {
        type: InvaderType.Boss,
        width: 80,
        height: 80,
        moveSpeed: 20,
        score: 150,
        hp: 40,
        shield: 3,
        damage: 20,
        regenerationRate: 0.5,
        projectileType: ProjectileType.Ultimate,
        fireRate: 6,
        shootProbability: 0.002,
        emitProbability: 1,
        bonusTypes: [GameBonusType.Health_Double_Shield_30sec, GameBonusType.Weapon_Double_Firerate_10sec, GameBonusType.Experience_Increase_1_Level],
    },
    [InvaderType.Heavy_Boss]: {
        type: InvaderType.Heavy_Boss,
        width: 80,
        height: 80,
        moveSpeed: 20,
        score: 200,
        hp: 80,
        shield: 5,
        damage: 50,
        regenerationRate: 1,
        projectileType: ProjectileType.Ultimate,
        fireRate: 8,
        shootProbability: 0.005,
        emitProbability: 1,
        bonusTypes: [GameBonusType.Health_Double_Shield_30sec, GameBonusType.Weapon_Double_Firerate_20sec, GameBonusType.Experience_Increase_1_Level, GameBonusType.Experience_Increase_1000_Score, GameBonusType.Weapon_Increase_15_FireRate_60sec, GameBonusType.Weapon_Double_Firerate_30sec],
    },
};
