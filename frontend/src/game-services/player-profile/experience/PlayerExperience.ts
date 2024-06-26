import { AppConfig } from "../../../core/config/AppConfig";
import { WaveSetType } from "../../invader-wave/types/WaveSetType";
import { PlayerProfile } from "../PlayerProfile";
import { PlayerDataService } from "../datas/PlayerDataService";
import { GameSessionStats } from "./models/GameSessionStats";

export class PlayerExperience {
    private playerProfile: PlayerProfile;
    private bestScore: number;
    private experiencePoints: number = 0;
    private totalExperiencePoints: number = 0;
    private gameSessions: GameSessionStats[];

    constructor(playerProfile: PlayerProfile) {
        this.playerProfile = playerProfile;
        this.bestScore = 0;
        this.experiencePoints = 0;
        this.gameSessions = [];
        this.restoreFromData();
    }

    restoreFromData(): void {
        const experienceData = PlayerDataService.getInstance().loadCurrentProfile(this.playerProfile.getPlayerName())?.experience;
        
        if (!experienceData) {
            console.error("No bonus data available to restore.");
            return;
        }
        
        this.bestScore = experienceData.bestScore;
        this.experiencePoints = experienceData.experiencePoints;
        this.totalExperiencePoints = experienceData.total_ExperiencePoints;
        this.gameSessions = experienceData.gameSessions;
    }

    getBestScore(): number {
        return this.bestScore;
    }

    getExperiencePoints(): number {
        console.log('getExperiencePoints', this.experiencePoints);
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

    getTotalGameSessions(): number {
        return this.gameSessions.length;
    }

    getAllGameSessions(): GameSessionStats[] {
        return this.gameSessions;
    }

    getAverageScore(): number {
        if (this.gameSessions.length === 0) return 0;
        const totalScore = this.gameSessions.reduce((acc, session) => acc + session.totalScore, 0);
        return totalScore / this.gameSessions.length;
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
        this.totalExperiencePoints += points; 
        PlayerDataService.getInstance().saveCurrentProfile(this.playerProfile);
    }

    getTotalExperiencePoints(): number {
        return this.totalExperiencePoints;
    }

    subtractExperiencePoints(points: number): void {
        this.experiencePoints -= points;
        PlayerDataService.getInstance().saveCurrentProfile(this.playerProfile);
    }

    private calculateExperiencePointsFromSession(sessionStats: GameSessionStats): number {
        const config = AppConfig.getInstance();

        let experiencePoints = sessionStats.totalScore * config.experience_PointPerScore;
        
        if (sessionStats.hasWon) {
            experiencePoints *= config.experience_WinMultiplicator;
        }

        switch (sessionStats.getWaveSetType()) {
            case WaveSetType.Beginner:
            case WaveSetType.Beginner_2:
            case WaveSetType.Beginner_3:
                experiencePoints *= config.experience_BeginnerMultiplicator;
                break;
            case WaveSetType.Intermediate:
            case WaveSetType.Intermediate_2:
            case WaveSetType.Intermediate_3:
                experiencePoints *= config.experience_IntermediateMultiplicator;
                break;
            case WaveSetType.Expert:
            case WaveSetType.Expert_2:
            case WaveSetType.Expert_3:
                experiencePoints *= config.experience_ExpertMultiplicator;
                break;
        }

        return experiencePoints;
    }
}
