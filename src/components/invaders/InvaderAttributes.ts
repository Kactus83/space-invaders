import { InvaderType } from "../../types/InvaderType";

export interface InvaderAttributes {
    health: number;
    speed: number;
    color: string;
    width: number;
    height: number;
}

export const InvaderTypesAttributes: Record<InvaderType, InvaderAttributes> = {
    [InvaderType.Basic]: { health: 1, speed: 1, color: '#342AA4', width: 10, height: 10 },
    [InvaderType.Advanced]: { health: 2, speed: 1.5, color: '#2F0D7D', width: 12, height: 12 },
    [InvaderType.Elite]: { health: 3, speed: 2, color: '#5F0D7D', width: 14, height: 14 },
    [InvaderType.Boss]: { health: 4, speed: 0.5, color: '#B91AC1', width: 20, height: 20 },
};
