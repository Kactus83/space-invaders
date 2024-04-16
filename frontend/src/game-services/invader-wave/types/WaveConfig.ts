import { WaveInvaderConfig } from "./WaveInvaderConfig";

export interface WaveConfig {
    delay: number; // Temps avant le déclenchement de la vague, en secondes
    invaders: WaveInvaderConfig[];
}