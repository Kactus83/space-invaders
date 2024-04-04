import { GameSessionStats } from "../models/GameSessionStats";

export interface PlayerExperienceData {
    bestScore: number;
    experiencePoints: number;
    gameSessions: GameSessionStats[];
}