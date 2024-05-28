import { IGroundLineLevelCharacteristics } from "./IGroundLineLevelCharacteristics";

const GroundLineLevels: Record<number, IGroundLineLevelCharacteristics> = {
    1: {
        hp: 100, 
        shield: 0, 
        damage: 0, 
        regenerationRate: 0, 
        experience_Cost: 0,
    },
    2: {
        hp: 150, 
        shield: 0, 
        damage: 0, 
        regenerationRate: 0, 
        experience_Cost: 100,
    },
    3: {
        hp: 200, 
        shield: 0, 
        damage: 0, 
        regenerationRate: 0, 
        experience_Cost: 250,
    },
    4: {
        hp: 200, 
        shield: 1, 
        damage: 0, 
        regenerationRate: 0, 
        experience_Cost: 500,
    },
    5: {
        hp: 250, 
        shield: 1, 
        damage: 0, 
        regenerationRate: 0, 
        experience_Cost: 1000,
    },
    6: {
        hp: 250, 
        shield: 1, 
        damage: 0, 
        regenerationRate: 0.05, 
        experience_Cost: 2500,
    },
    7: {
        hp: 300, 
        shield: 1, 
        damage: 0, 
        regenerationRate: 0.001, 
        experience_Cost: 5000,
    },
    8: {
        hp: 300, 
        shield: 2, 
        damage: 0, 
        regenerationRate: 0.005, 
        experience_Cost: 7500,
    },
    9: {
        hp: 400, 
        shield: 2, 
        damage: 0, 
        regenerationRate: 0.005, 
        experience_Cost: 10000,
    },
    10: {
        hp: 500, 
        shield: 2, 
        damage: 0, 
        regenerationRate: 0.01, 
        experience_Cost: 10000,
    },
};

export { GroundLineLevels };