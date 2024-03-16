import { InvaderType } from "./InvaderType";

export const InvaderSpecs: Record<InvaderType, { hp: number, speed: number, score: number }> = {
    [InvaderType.Basic]: { hp: 1, speed: 100, score: 10 },
    [InvaderType.Advanced]: { hp: 2, speed: 80, score: 20 },
    [InvaderType.Elite]: { hp: 3, speed: 60, score: 30 },
    [InvaderType.Boss]: { hp: 5, speed: 40, score: 50 },
};