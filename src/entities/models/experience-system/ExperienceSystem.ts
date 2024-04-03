import { GameSessionStats } from "../../../game-services/player-profile/experience/models/GameSessionStats";
import { InvaderType } from "../../invader/InvaderType";
import { Player } from "../../player/Player";
import { PlayerLevels } from "../../player/PlayerLevels";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { IExperienceSystemCharacteristics } from "./IExperienceSystemCharacteristics";
import { ExperienceBonus } from "./bonus/ExperienceBonus";

export class ExperienceSystem extends BonusReceiverTemplate<ExperienceBonus> {
    private characteristics: IExperienceSystemCharacteristics;
    private gameSessionStats: GameSessionStats = new GameSessionStats();
    private score: number = 0;
    private owner: Player;

    constructor(owner: Player, initialLevel: number) {
        super();
        this.owner = owner;
        this.characteristics = PlayerLevels[initialLevel];
        this.updateSystems();
    }

    get currentScore(): number {
        return this.score;
    }

    get level(): number {
        return this.characteristics.level;
    }

    get killCounts(): Record<InvaderType, number> {
        return this.gameSessionStats.killsByType;
    }

    getGameSessionStats(): GameSessionStats {
        return this.gameSessionStats;
    }
    
    public increaseScore(amount: number): void {
        if (this.currentBonus) {
            const effect = this.currentBonus.getEffect();
            // Applique d'abord les valeurs additionnelles puis les multiplicateurs
            amount += effect.additional_Score;
            amount *= effect.multiplicator_Score;
        }
        this.score += amount;
        console.log(`Score increased to ${this.score}`);
        this.checkForLevelUp();
    }
    
    public addInvaderKill(invaderType: InvaderType, scoreValue: number): void {
        // Appliquer les effets du bonus, le cas échéant
        if (this.currentBonus) {
            const effect = this.currentBonus.getEffect();
            scoreValue += effect.additional_Score;
            scoreValue *= effect.multiplicator_Score;
        }
        this.gameSessionStats.addKill(invaderType, scoreValue);
        this.checkForLevelUp();
    }

    private checkForLevelUp(): void {
        const nextLevel = this.characteristics.level + 1;
        const nextLevelCharacteristics = PlayerLevels[nextLevel];
        if (nextLevelCharacteristics && this.score >= nextLevelCharacteristics.scoreThreshold) {
            this.characteristics = nextLevelCharacteristics;
            this.updateSystems();
            this.owner.loadDesign();
        }
    }

    private updateSystems(): void {
        // Mise à jour des caractéristiques dans HealthSystem, WeaponSystem, SpeedSystem
        if (this.owner.healthSystem) {
            this.owner.healthSystem.updateCharacteristics(this.characteristics);
        }
        if (this.owner.weaponSystem) {
            this.owner.weaponSystem.updateCharacteristics(this.characteristics);
        }
        if (this.owner.speedSystem) {
            this.owner.speedSystem.updateCharacteristics({ moveSpeed: this.characteristics.moveSpeed });
        }
    }
}
