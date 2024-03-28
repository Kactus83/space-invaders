import { IGroundLineLevelCharacteristics } from "./IGroundLineLevelCharacteristics";

const GroundLineLevels: Record<number, IGroundLineLevelCharacteristics> = {
    1: {
        hp: 500, 
        shield: 0, 
        damage: 0, 
        regenerationRate: 0, 
    }
};

export { GroundLineLevels };