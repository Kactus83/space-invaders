import { AppConfig } from "../../../core/config/AppConfig";
import { GameSessionStats } from "./models/GameSessionStats";

export class PlayerExperience {
    private bestScore: number;
    private experiencePoints: number;
    private gameSessions: GameSessionStats[];

    constructor() {
        this.bestScore = 0;
        this.experiencePoints = 0;
        this.gameSessions = [];
    }

    getBestScore(): number {
        return this.bestScore;
    }

    getExperiencePoints(): number {
        return this.experiencePoints;
    }
    
    getLastGameSessionStats(): GameSessionStats | null {
        if (this.gameSessions.length === 0) return null;
        return this.gameSessions[this.gameSessions.length - 1];
    }
    
    getGameSessionByIndex(index: number): GameSessionStats | null {
        if (index >= 0 && index < this.gameSessions.length) {
            return this.gameSessions[index];
        }
        return null;
    }

    addGameSessionStats(sessionStats: GameSessionStats): void {
        this.gameSessions.push(sessionStats);
        this.updateBestScore(sessionStats.totalScore);

        // Ajoutez ici la logique de conversion du score de la session en points d'expérience
        const experiencePointsFromSession = this.calculateExperiencePointsFromSession(sessionStats);
        this.addExperiencePoints(experiencePointsFromSession);
    }

    updateBestScore(score: number): void {
        if (score > this.bestScore) {
            this.bestScore = score;
        }
    }

    addExperiencePoints(points: number): void {
        this.experiencePoints += points;
    }

    private calculateExperiencePointsFromSession(sessionStats: GameSessionStats): number {
        const config = AppConfig.getInstance();

        let experiencePoints = sessionStats.totalScore * config.experience_PointPerScore;
        
        if (sessionStats.hasWon) {
            experiencePoints *= config.experience_WinMultiplicator;
        }

        return experiencePoints;
    }
}
