import { AppConfig } from "../../core/config/AppConfig";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { GameEntity } from "../GameEntity";
import { Invader } from "../invader/Invader";
import { HealthSystem } from "../models/health-system/HealthSystem";
import { WeaponSystem } from "../models/weapon-system/WeaponSystem";
import { Projectile } from "../projectile/Projectile";
import { ProjectileType } from "../projectile/ProjectileType";
import { IShooter } from "../types/IShooter";
import { Wall } from "../wall/Wall";
import { PlayerLevels, MaxLevel } from "./PlayerLevels";

export class Player extends GameEntity implements IInteractive, IShooter {
    private subscriptionId: number;
    public level: number = 1;
    public score: number = 0;
    private moveSpeed: number = PlayerLevels[1].moveSpeed;
    // Nouveaux systèmes intégrés
    public healthSystem: HealthSystem;
    private weaponSystem: WeaponSystem;

    constructor() {
        super();
        this.subscribeToInputManager();
        const levelCharacteristics = PlayerLevels[this.level];
        this.healthSystem = new HealthSystem(this, levelCharacteristics);
        this.weaponSystem = new WeaponSystem(this, levelCharacteristics);
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getPlayerDesign(this.level);
        const config = AppConfig.getInstance();

        let x_position: number;
        let y_position: number;

        if(this.fabricObject && this.fabricObject.left && this.fabricObject.top) {
            x_position = this.fabricObject.left;
            y_position = this.fabricObject.top;
        }else{
            x_position = config.player_InitialX;
            y_position = config.player_InitialY;
        }

        this.fabricObject = await this.createFabricObject(design, { x: x_position, y: y_position });
        if(this.fabricObject) {
            this.shouldUpdateDesign = false;
        }
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            // Logique de collision avec les joueurs
        } else if (entity instanceof Projectile) {
            if(entity.origin === this) {
                return;
            }
            this.healthSystem.takeDamage(entity.healthSystem.damage);
        } else if (entity instanceof Wall) {
            // Logique de collision avec les murs
        } else if (entity instanceof Invader) {
            this.healthSystem.takeDamage(entity.healthSystem.damage);
        } else {
            throw new Error("Unknown entity type");
        }
    }

    private subscribeToInputManager(): void {
        const inputManager = InputManager.getInstance();
        this.subscriptionId = inputManager.subscribe(this);
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
            case UserInputType.Enter:
                if(AppConfig.getInstance().god_Mode) {
                    this.increaseScore(200);
                }
                break;
            // Implémentez d'autres cas si nécessaire
        }
    }

    private moveLeft(): void {
        if (this.fabricObject && this.fabricObject.left > 0) {
            this.fabricObject.left -= this.moveSpeed;
        }
    }

    private moveRight(): void {
        if (this.fabricObject && (this.fabricObject.left + this.fabricObject.width) < AppConfig.getInstance().canvasWidth) {
            this.fabricObject.left += this.moveSpeed;
        }
    }

    public async shoot(): Promise<void> {
        // Utiliser le système d'armement pour tirer
        this.weaponSystem.shoot();
        const newProjectiles = this.weaponSystem.getNewProjectiles();
        // Traiter les nouveaux projectiles...
    }

    public getNewProjectiles(): Projectile[] {
        return this.weaponSystem.getNewProjectiles();
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
        // Mise à jour du niveau et des caractéristiques des systèmes
        if (newLevel !== this.level && newLevel <= MaxLevel) {
            this.level = newLevel;
            const levelCharacteristics = PlayerLevels[newLevel];
            this.moveSpeed = levelCharacteristics.moveSpeed;
            this.healthSystem.updateCharacteristics(levelCharacteristics);
            this.weaponSystem.updateCharacteristics(levelCharacteristics);
            this.shouldUpdateDesign = true;
            // Autres mises à jour liées au changement de niveau
        }
    }

    public cleanup(): void {
        InputManager.getInstance().unsubscribe(this.subscriptionId);
    }

}
