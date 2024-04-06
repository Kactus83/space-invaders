import { InvaderType } from "../../../../entities/invader/InvaderType";
import { WaveConfig } from "../../types/WaveConfig";

export const intermediateWaves: WaveConfig[] = [
    {
        delay: 5, // Première vague après 10 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Basic, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Strong, count: 5, row: 2 },
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
        delay: 5, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Light, count: 5, row: 1 },
            { type: InvaderType.Light, count: 5, row: 2 },
        ],
    },
    {
        delay: 18, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Medium, count: 5, row: 1 },
            { type: InvaderType.Medium, count: 5, row: 2 },
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
        delay: 25, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Basic, count: 5, row: 2 },
        ],
    },
    {
        delay: 33, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Heavy, count: 5, row: 2 },
        ],
    },
    {
        delay: 40, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Light, count: 5, row: 1 },
            { type: InvaderType.Light, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Fast, count: 5, row: 1 },
            { type: InvaderType.Fast, count: 5, row: 2 },
        ],
    },
    {
        delay: 5, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Fast, count: 5, row: 1 },
            { type: InvaderType.Fast_Kamikaze, count: 5, row: 2 },
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
        delay: 15, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Strong, count: 5, row: 1 },
            { type: InvaderType.Strong, count: 5, row: 2 },
        ],
    },
    {
        delay: 20, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Basic, count: 5, row: 1 },
            { type: InvaderType.Heavy, count: 5, row: 2 },
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
        delay: 25, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Specialized, count: 5, row: 1 },
            { type: InvaderType.Specialized, count: 5, row: 2 },
        ],
    },
    {
        delay: 10, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Fast_Kamikaze, count: 5, row: 1 },
            { type: InvaderType.Fast_Kamikaze, count: 5, row: 2 },
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
            { type: InvaderType.Elite, count: 5, row: 2 },
        ],
    },
    {
        delay: 15, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Elite, count: 5, row: 1 },
            { type: InvaderType.Light_Boss, count: 5, row: 2 },
        ],
    },
    {
        delay: 20, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Boss, count: 5, row: 1 },
            { type: InvaderType.Boss, count: 5, row: 2 },
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
        delay: 8, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Light, count: 5, row: 1 },
            { type: InvaderType.Light, count: 5, row: 2 },
        ],
    },
    {
        delay: 0, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Boss, count: 5, row: 1 },
            { type: InvaderType.Boss, count: 5, row: 2 },
        ],
    },
    {
        delay: 8, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Heavy_Boss, count: 5, row: 1 },
            { type: InvaderType.Heavy_Boss, count: 5, row: 2 },
        ],
    },
    {
        delay: 8, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Advanced, count: 5, row: 1 },
            { type: InvaderType.Advanced, count: 5, row: 2 },
        ],
    },
    {
        delay: 8, // Seconde vague après 20 secondes
        invaders: [
            { type: InvaderType.Advanced, count: 5, row: 1 },
            { type: InvaderType.Advanced, count: 5, row: 2 },
        ],
    },
    // Ajoutez d'autres configurations de vague comme nécessaire
];


export const maxIntermediateWave: number = intermediateWaves.length;