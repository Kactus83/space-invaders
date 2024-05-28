import { GameSessionStats } from "../models/GameSessionStats";

export interface PlayerExperienceData {
    bestScore: number;
    experiencePoints: number;
    total_ExperiencePoints: number;
    gameSessions: GameSessionStats[];
}