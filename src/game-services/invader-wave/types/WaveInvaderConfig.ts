import { InvaderType } from "../../../../old-src/entities/game/invader/InvaderType";

export interface WaveInvaderConfig {
    type: InvaderType;
    count: number;
    row: number; 
}