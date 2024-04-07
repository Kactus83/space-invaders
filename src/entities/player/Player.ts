import { AppConfig } from "../../core/config/AppConfig";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { GameEntity } from "../GameEntity";
import { GameBonus } from "../bonus/GameBonus";
import { Invader } from "../invader/Invader";
import { BonusManagementSystem } from "../models/bonus-system/bonus-management/BonusManagementSystem";
import { HealthSystem } from "../models/health-system/HealthSystem";
import { ExperienceSystem } from "../models/experience-system/ExperienceSystem";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { WeaponSystem } from "../models/weapon-system/WeaponSystem";
import { Projectile } from "../projectile/Projectile";
import { IShooter } from "../types/IShooter";
import { Wall } from "../wall/Wall";
import { PlayerLevels, MaxLevel } from "./PlayerLevels";
import { SkillSystem } from "../models/skill-system/SkillSystem";

export class Player extends GameEntity implements IInteractive, IShooter {
    private subscriptionId: number;
    // Nouveaux systèmes intégrés
    public speedSystem: SpeedSystem;
    public healthSystem: HealthSystem;
    public weaponSystem: WeaponSystem;
    public experienceSystem: ExperienceSystem;
    public bonusManagementSystem: BonusManagementSystem;
    public skillSystem: SkillSystem;

    constructor() {
        super();
        this.subscribeToInputManager();
        const levelCharacteristics = PlayerLevels[1]; 
        this.speedSystem = new SpeedSystem(this, levelCharacteristics);
        this.healthSystem = new HealthSystem(this, levelCharacteristics);
        this.weaponSystem = new WeaponSystem(this, levelCharacteristics);
        this.experienceSystem = new ExperienceSystem(this, PlayerLevels);
        this.bonusManagementSystem = new BonusManagementSystem(this);
        this.skillSystem = new SkillSystem(this, levelCharacteristics);
    }
    
    public async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getPlayerDesign(this.experienceSystem.level);
        const config = AppConfig.getInstance();
    
        let x_position: number;
        let y_position: number;
    
        // Calculer la hauteur disponible pour le joueur
        const playerZoneHeight = config.wall_InitialY - config.player_Min_Y;
    
        // Si l'objet fabric existe déjà, utilisez ses positions actuelles
        if(this.fabricObject && this.fabricObject.left && this.fabricObject.top) {
            x_position = this.fabricObject.left;
            // Y position basée sur le design actuel pour conserver la hauteur appropriée
            const playerDesignHeight = design.height; // Assurez-vous que votre objet de design a une propriété `height`
            y_position = config.player_Min_Y + (playerZoneHeight - playerDesignHeight) / 2;
        } else {
            // Sinon, initialisez les positions X et Y à partir des configurations
            x_position = config.player_InitialX;
            // Calcul initial pour centrer le design du joueur dans sa zone disponible
            const initialDesignHeight = design.height; // Utiliser la hauteur du premier design
            y_position = config.player_Min_Y + (playerZoneHeight - initialDesignHeight) / 2;
        }
    
        // Mettre à jour ou initialiser l'objet fabric avec le design et les positions calculées
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
        } else if (entity instanceof GameBonus) {
            this.bonusManagementSystem.addBonus(entity.getSystemBonus());
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
            case UserInputType.Shoot:
                this.shoot();
                break;
            case UserInputType.Enter:
                if (AppConfig.getInstance().god_Mode) {
                    this.increaseScore(200);
                }
                break;
            case UserInputType.Up:
                this.bonusManagementSystem.activateFirstActiveBonus();
                break;
            case UserInputType.Num1:
                this.skillSystem.activateSkillByIndex(1);
                break;
            case UserInputType.Num2:
                this.skillSystem.activateSkillByIndex(2);
                break;
            case UserInputType.Num3:
                this.skillSystem.activateSkillByIndex(3);
                break;
            case UserInputType.Num4:
                this.skillSystem.activateSkillByIndex(4);
                break;
            // Implement other cases if necessary
        }
    }

    public async shoot(): Promise<void> {
        // Utiliser le système d'armement pour tirer
        this.weaponSystem.shoot();
    }

    public getNewProjectiles(): Projectile[] {
        return this.weaponSystem.getNewProjectiles();
    }
    

    update(deltaTime: number): void {
        this.experienceSystem.update();
        this.bonusManagementSystem.update();
        this.skillSystem.update(deltaTime);
        this.healthSystem.update(deltaTime);
        
        const inputManager = InputManager.getInstance();

        if (inputManager.isKeyPressed(UserInputType.Left)) {
            this.move(-this.speedSystem.moveSpeed * deltaTime / 1000);
        }
        if (inputManager.isKeyPressed(UserInputType.Right)) {
            this.move(this.speedSystem.moveSpeed * deltaTime / 1000);
        }
        if (inputManager.isKeyPressed(UserInputType.Shoot)) {
            this.shoot();
        }
    }
    

    private move(deltaX: number): void {
        if (this.fabricObject) {
            this.fabricObject.left += deltaX;
            // Ajouter des contrôles pour empêcher le joueur de sortir de l'écran...
        }
    }
    
    public increaseScore(amount: number): void {
        this.experienceSystem.increaseScore(amount);
    }

    public cleanup(): void {
        InputManager.getInstance().unsubscribe(this.subscriptionId);
    }

}
