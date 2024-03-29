import { Player } from "../../player/Player";
import { PlayerLevels } from "../../player/PlayerLevels";
import { ILevelSystemCharacteristics } from "./ILevelSystemCharacteristics";

export class LevelSystem {
    private characteristics: ILevelSystemCharacteristics;
    private score: number = 0;
    private owner: Player;

    constructor(owner: Player, initialLevel: number) {
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

    public increaseScore(amount: number): void {
        console.log(`Score increased by ${amount}`);
        this.score += amount;
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
