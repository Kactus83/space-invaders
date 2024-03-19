import { InvaderType } from "./InvaderType";

export const InvaderSpecs: Record<InvaderType, { hp: number, speed: number, score: number, damage: number }> = {
    [InvaderType.Basic]: { hp: 1, speed: 130, score: 10, damage: 1},
    [InvaderType.Advanced]: { hp: 2, speed: 100, score: 20, damage: 2},
    [InvaderType.Elite]: { hp: 3, speed: 70, score: 30, damage: 3},
    [InvaderType.Boss]: { hp: 5, speed: 50, score: 50, damage: 4},
};