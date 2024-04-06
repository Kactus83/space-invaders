import { InvaderType } from "../../../../entities/invader/InvaderType";
import { InvaderKillCount } from "../types/InvaderKillCount";

export class GameSessionStats {
    private isWinningSession: boolean = false;
    private score: number = 0;
    private invaderKills: InvaderKillCount = {
        [InvaderType.None]: 0,
        [InvaderType.Light]: 0,
        [InvaderType.Basic]: 0,
        [InvaderType.Medium]: 0,
        [InvaderType.Strong]: 0,
        [InvaderType.Advanced]: 0,
        [InvaderType.Heavy]: 0,
        [InvaderType.Elite]: 0,
        [InvaderType.Boss]: 0,
        [InvaderType.Fast]: 0,
        [InvaderType.Fast_Kamikaze]: 0,
        [InvaderType.Specialized]: 0,
        [InvaderType.Light_Boss]: 0,
        [InvaderType.Heavy_Boss]: 0
    };

    constructor() {
        Object.values(InvaderType).forEach(type => {
            this.invaderKills[type] = 0;
        });
    }

    addKill(invaderType: InvaderType, scoreValue: number): void {
        this.score += scoreValue;
        this.invaderKills[invaderType]++;
    }

    setWinningSessionBool(isWinningSession: boolean): void {
        this.isWinningSession = isWinningSession;
    }

    get totalScore(): number {
        return this.score;
    }

    get killsByType(): InvaderKillCount {
        return this.invaderKills;
    }

    get hasWon(): boolean {
        return this.isWinningSession;
    }
}