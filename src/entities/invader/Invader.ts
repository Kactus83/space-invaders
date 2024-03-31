import { GameEntity } from "../GameEntity";
import { InvaderType } from "./InvaderType";
import { InvaderSpecs } from "./InvaderTypesSpecs";
import { Player } from "../player/Player";
import { Projectile } from "../projectile/Projectile";
import { Wall } from "../wall/Wall";
import { AppConfig } from "../../core/config/AppConfig";
import { HealthSystem } from "../models/health-system/HealthSystem";
import { WeaponSystem } from "../models/weapon-system/WeaponSystem";
import { EntityState } from "../types/EntityState";
import { IShooter } from "../types/IShooter";
import { GroundLine } from "../ground-line/GroundLine";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { BonusEmitterSystem } from "../models/bonus-system/bonus-emitter/BonusEmitterSystem";
import { GameBonus } from "../bonus/GameBonus";

export class Invader extends GameEntity implements IShooter {
    private initialPosition: { x: number, y: number };
    private descendingToNextLine: boolean = false;
    private nextLinePosition: number;
    private isRushing: boolean = false;
    private horizontalMovementDirection: 'left' | 'right' = 'right';
    private speedSystem: SpeedSystem;
    public healthSystem: HealthSystem;
    private weaponSystem: WeaponSystem;
    private bonusEmitterSystem: BonusEmitterSystem;
    private score: number;
    private type: InvaderType;

    constructor(type: InvaderType, initialPosition: { x: number, y: number }) {
        super();
        this.type = type;
        this.entityType = this;
        const specs = InvaderSpecs[type];
        this.score = specs.score;
        this.initialPosition = initialPosition;
        this.speedSystem = new SpeedSystem(this, specs);
        this.healthSystem = new HealthSystem(this, specs);
        this.weaponSystem = new WeaponSystem(this, specs);
        this.bonusEmitterSystem = new BonusEmitterSystem(this, specs);
        this.bonusEmitterSystem.prepareBonus();
        const descentStep = InvaderSpecs[this.type].height <= 50 ? 50 : 100;
        this.nextLinePosition = initialPosition.y + descentStep;
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getInvaderDesign(this.type, this.healthSystem.healthState);
    
        let x_position: number;
        let y_position: number;
    
        // Vérifiez si l'objet existe déjà et utilisez ses coordonnées
        if (this.fabricObject && this.fabricObject.left && this.fabricObject.top) {
            x_position = this.fabricObject.left;
            y_position = this.fabricObject.top;
        } else {
            // Sinon, utilisez les coordonnées d'apparition initiales
            x_position = this.initialPosition.x;
            y_position = this.initialPosition.y;
        }
    
        this.fabricObject = await this.createFabricObject(design, { x: x_position, y: y_position });
        // Indiquez que le design ne doit plus être mis à jour jusqu'à nouvelle instruction
        this.shouldUpdateDesign = false;
    }    

    async update(deltaTime: number): Promise<void> {
        const config = AppConfig.getInstance();
    
        if (!this.fabricObject) return;
    
        if (this.isRushing) {
            this.rushDown(deltaTime);
            return;
        }

        if(this.descendingToNextLine) {
            this.descendToNextLine(deltaTime);
            return;
        }
    
        const specs = InvaderSpecs[this.type];
        const descentDistance = specs.height <= 50 ? 50 : 100; // Choix de la distance de descente basée sur la hauteur
    
        if (this.fabricObject.top <= config.rushLineLimit) {
            this.progressiveMovement(deltaTime, config, descentDistance);
        } else {
            this.horizontalMovement(deltaTime, config);
        }
    
        await this.shoot();
    }
    
    private progressiveMovement(deltaTime: number, config: AppConfig, descentDistance: number) {
        const deltaTimeInSeconds = deltaTime / 1000;
        const horizontalSpeed = this.speedSystem.moveSpeed * deltaTimeInSeconds;
    
        if (this.horizontalMovementDirection === 'right') {
            if (this.fabricObject.left + horizontalSpeed + this.fabricObject.width > config.canvasWidth) {
                this.horizontalMovementDirection = 'left';
                this.startDescending();
            } else {
                this.fabricObject.left += horizontalSpeed;
            }
        } else {
            if (this.fabricObject.left - horizontalSpeed < 0) {
                this.horizontalMovementDirection = 'right';
                this.startDescending();
            } else {
                this.fabricObject.left -= horizontalSpeed;
            }
        }
    }

    private startDescending() {
        this.descendingToNextLine = true;
        const descentStep = InvaderSpecs[this.type].height <= 50 ? 50 : 100;
        this.nextLinePosition = this.fabricObject.top + descentStep;
    }

    private descendToNextLine(deltaTime: number) {
        const deltaTimeInSeconds = deltaTime / 1000;
        if (this.fabricObject.top < this.nextLinePosition) {
            this.fabricObject.top += deltaTimeInSeconds * this.speedSystem.moveSpeed;
        } else {
            this.descendingToNextLine = false;
        }
    }

    private horizontalMovement(deltaTime: number, config: AppConfig) {
        const deltaTimeInSeconds = deltaTime / 1000;
        let potentialMove = this.speedSystem.moveSpeed * deltaTimeInSeconds * (this.horizontalMovementDirection === 'right' ? 1 : -1);

        // Si l'Invader atteint un bord, il change simplement de direction sans descendre
        if (this.fabricObject.left + potentialMove < 0 || this.fabricObject.left + potentialMove + this.fabricObject.width > config.canvasWidth) {
            this.horizontalMovementDirection = this.horizontalMovementDirection === 'right' ? 'left' : 'right';
        } else {
            this.fabricObject.left += potentialMove;
        }

        if (this.fabricObject.top > config.rushLineLimit && Math.random() < config.rushProbability) {
            this.isRushing = true;
        }
    }

    private rushDown(deltaTime: number) {
        // Logique pour le rush vers le bas
        const deltaTimeInSeconds = deltaTime / 1000;
        this.fabricObject.top += this.speedSystem.moveSpeed * deltaTimeInSeconds;
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            this.healthSystem.onCollision(entity.healthSystem);
            if(this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }
        } else if (entity instanceof GroundLine) {
            this.healthSystem.onCollision(entity.healthSystem);
            if(this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }
        } else if (entity instanceof Projectile) {
            if(entity.origin instanceof Invader) {
                return;
            }
  
            this.healthSystem.onCollision(entity.healthSystem);
            if(this.healthSystem.health <= 0) {
                if(entity.origin instanceof Player) {
                    entity.origin.increaseScore(this.score);
                }
                this.state = EntityState.ToBeRemoved;
            }
        } else if (entity instanceof Wall) {
            this.healthSystem.onCollision(entity.healthSystem);
            if(this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }
        } else if (entity instanceof Invader) {
            // Logique de collision avec les autres invaders
        } else {
            throw new Error("Unknown entity type");
        }
    }

    public getNewProjectiles(): Projectile[] {
        return this.weaponSystem.getNewProjectiles();
    }

    public getGameBonus(): GameBonus | null {
        const bonus = this.bonusEmitterSystem.getPreparedBonus();
        if (bonus) {
            console.log("Bonus emitted");
            bonus.setPosition({ x: this.fabricObject?.left ?? 0, y: this.fabricObject?.top ?? 0 });
        }
        return bonus;
    }

    private async shoot(): Promise<void> {
        await this.weaponSystem.shoot();
    }
    

    // Méthodes spécifiques aux invaders...
}
