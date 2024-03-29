import { InvaderType } from "../../../entities/invader/InvaderType";

export interface WaveInvaderConfig {
    type: InvaderType
    count: number;
    row: number; 
}