import { InvaderType } from "../../types/InvaderType";

export interface InvaderAttributes {
    health: number;
    speed: number;
}

export const InvaderTypesAttributes: Record<InvaderType, InvaderAttributes> = {
    [InvaderType.Basic]: { health: 1, speed: 1 },
    [InvaderType.Advanced]: { health: 2, speed: 1.5 },
    [InvaderType.Elite]: { health: 3, speed: 2 },
    [InvaderType.Boss]: { health: 4, speed: 0.5 },
};
