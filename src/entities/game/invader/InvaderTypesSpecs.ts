import { InvaderType } from "./InvaderType";

export const InvaderSpecs: Record<InvaderType, { hp: number, speed: number, score: number, damage: number }> = {
    [InvaderType.Light]: { hp: 1, speed: 200, score: 25, damage: 1},
    [InvaderType.Basic]: { hp: 1, speed: 130, score: 10, damage: 1},
    [InvaderType.Advanced]: { hp: 2, speed: 100, score: 20, damage: 2},
    [InvaderType.Strong]: { hp: 5, speed: 50, score: 30, damage: 4},
    [InvaderType.Elite]: { hp: 3, speed: 70, score: 50, damage: 5},
    [InvaderType.Boss]: { hp: 10, speed: 35, score: 250, damage: 15},
};