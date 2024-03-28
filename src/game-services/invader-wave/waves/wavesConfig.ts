import { InvaderType } from "../../../../old-src/entities/game/invader/InvaderType";
import { WaveConfig } from "../types/WaveConfig";

export const waveConfigs: WaveConfig[] = [
    {
        delay: 10, // Première vague après 10 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Basic, count: 5, row: 2 },
        ],
    },
    {
        delay: 20, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Light, count: 5, row: 1 },
            { type: InvaderType.Light, count: 5, row: 2 },
        ],
    },
    {
        delay: 8, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Light, count: 5, row: 1 },
            { type: InvaderType.Light, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Light, count: 5, row: 1 },
            { type: InvaderType.Light, count: 5, row: 2 },
        ],
    },
    {
        delay: 15, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Strong, count: 5, row: 1 },
            { type: InvaderType.Strong, count: 5, row: 2 },
        ],
    },
    {
        delay: 15, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Basic, count: 5, row: 2 },
        ],
    },
    {
        delay: 8, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Light, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Light, count: 5, row: 1 },
            { type: InvaderType.Light, count: 5, row: 2 },
        ],
    },
    {
        delay: 25, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Strong, count: 5, row: 1 },
            { type: InvaderType.Strong, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Basic, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Advanced, count: 5, row: 1 },
            { type: InvaderType.Strong, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Elite, count: 5, row: 1 },
            { type: InvaderType.Advanced, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Elite, count: 5, row: 1 },
            { type: InvaderType.Boss, count: 5, row: 2 },
        ],
    },
    // Ajoutez d'autres configurations de vague comme nécessaire
];


export const maxWave: number = waveConfigs.length;