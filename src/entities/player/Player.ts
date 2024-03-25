import { AppConfig } from "../../core/config/AppConfig";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { GameEntity } from "../GameEntity";
import { PlayerLevels, MaxLevel } from "./PlayerLevels";

export class Player extends GameEntity implements IInteractive {
    private level: number = 1;
    private hp: number = PlayerLevels['1'].lifeBonus; 
    private score: number = 0;
    private moveSpeed: number = PlayerLevels['1'].moveSpeed;

    constructor() {
        super();
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getPlayerDesign(this.level);
        this.fabricObject = await this.createFabricObject(design);
    }

    onCollisionWith(entity: GameEntity): void {
        // Implémentez la logique de collision
    }

    handleInput(inputType: UserInputType): void {
        switch (inputType) {
            case UserInputType.Left:
                this.moveLeft();
                break;
            case UserInputType.Right:
                this.moveRight();
                break;
            case UserInputType.Shoot:
                this.shoot();
                break;
            // Implémentez d'autres cas si nécessaire
        }
    }

    private moveLeft(): void {
        if (this.fabricObject && this.fabricObject.left > 0) {
            this.fabricObject.left -= 10;
        }
    }

    private moveRight(): void {
        if (this.fabricObject && (this.fabricObject.left + this.fabricObject.width) < AppConfig.getInstance().canvasWidth) {
            this.fabricObject.left += 10;
        }
    }

    private shoot(): void {
        // Implémenter la logique de tir du joueur
        console.log("Player shoots");
    }

    update(deltaTime: number): void {
    }
    
    public increaseScore(amount: number): void {
        this.score += amount;
        this.checkForLevelUpdate();
    }

    private checkForLevelUpdate(): void {
        for (let level = 2; level <= MaxLevel; level++) {
            if (this.score >= PlayerLevels[level].scoreThreshold && this.level < level) {
                this.setLevel(level);
                break;
            }
        }
    }

    private setLevel(newLevel: number): void {
        if (newLevel !== this.level && newLevel <= MaxLevel) {
            const levelSpecs = PlayerLevels[newLevel];
            this.level = newLevel;
            this.moveSpeed = levelSpecs.moveSpeed;
            this.hp += levelSpecs.lifeBonus; // Appliquez le bonus de vie
            this.shouldUpdateDesign = true; // Trigger la mise à jour du design
        }
    }

}
