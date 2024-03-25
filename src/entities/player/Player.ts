import { AppConfig } from "../../core/config/AppConfig";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { GameEntity } from "../GameEntity";
import { Projectile } from "../projectile/Projectile";
import { ProjectileType } from "../projectile/ProjectileType";
import { IShooter } from "../types/IShooter";
import { PlayerLevels, MaxLevel } from "./PlayerLevels";

export class Player extends GameEntity implements IInteractive, IShooter {
    private subscriptionId: number;
    private shootCallbacks: ((projectile: Projectile) => void)[] = [];
    private lastShootTime: number = 0;
    private level: number = 1;
    private projectileType: ProjectileType = PlayerLevels['1'].projectileType;
    private fireRate: number = PlayerLevels['1'].fireRate;
    private hp: number = PlayerLevels['1'].lifeBonus; 
    private shield: number = PlayerLevels['1'].shield;
    private score: number = 0;
    private moveSpeed: number = PlayerLevels['1'].moveSpeed;

    constructor() {
        super();
        this.subscribeToInputManager();
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
        // Implémentez la logique de collision
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

    private shoot(): void {
        // Obtient le timestamp actuel.
        const now = Date.now();

        // Calcule l'intervalle minimal entre les tirs en millisecondes, basé sur le fireRate actuel du joueur.
        // Le fireRate est considéré comme le nombre de tirs autorisés par seconde.
        const fireRateInterval = 1000 / this.fireRate;

        // Vérifie si le joueur est autorisé à tirer en se basant sur le dernier moment de tir et le fireRate,
        // ou si le GodMode est activé, permettant de tirer sans restriction.
        if ((now - this.lastShootTime >= fireRateInterval) || AppConfig.getInstance().god_Mode) {
            
            const projectile = new Projectile(
                this,
                this.projectileType,
                {
                    x: this.fabricObject.left + this.fabricObject.width / 2, 
                    y: this.fabricObject.top - this.fabricObject.height / 1.99 
                }
            );

            // Mise à jour du dernier moment de tir pour respecter le fireRate.
            this.lastShootTime = now;

            // Notifie les abonnés que le joueur a tiré, permettant par exemple de gérer la création et l'animation du projectile dans le jeu.
            this.shootCallbacks.forEach(callback => callback(projectile));
        }
    }

    public onShoot(callback: (projectile: Projectile) => void) {
        console.log('Player subscribed to shoot event');
        this.shootCallbacks.push(callback);
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
            this.projectileType = levelSpecs.projectileType;
            this.fireRate = levelSpecs.fireRate;
            this.moveSpeed = levelSpecs.moveSpeed;
            this.hp += levelSpecs.lifeBonus; 
            this.shield = levelSpecs.shield;
            this.shouldUpdateDesign = true;
        }
    }

    public cleanup(): void {
        InputManager.getInstance().unsubscribe(this.subscriptionId);
    }

}
