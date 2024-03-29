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

export class Invader extends GameEntity implements IShooter {
    private initialPosition: { x: number, y: number };
    private speedSystem: SpeedSystem;
    public healthSystem: HealthSystem;
    private weaponSystem: WeaponSystem;
    private speed: number;
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
    
        if (this.fabricObject) {
            // Calcul du déplacement potentiel en tenant compte de deltaTime en millisecondes
            const deltaTimeInSeconds = deltaTime / 1000;
            let potentialLeft = this.fabricObject.left + (this.speed * deltaTimeInSeconds * (this.fabricObject.flipX ? -1 : 1));
        
            // Gestion du changement de direction et du déplacement vertical lorsqu'un bord est atteint
            if (potentialLeft < 0 || potentialLeft + this.fabricObject.width > config.canvasWidth) {
                this.fabricObject.flipX = !this.fabricObject.flipX; // Inverse la direction horizontale
                this.fabricObject.top += 60; // Déplacement vertical
            } else {
                // Applique le déplacement horizontal
                this.fabricObject.left = potentialLeft;
            }
    
            // Tentative de tir
            await this.shoot();
        }
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

    private async shoot(): Promise<void> {
        await this.weaponSystem.shoot();
    }
    

    // Méthodes spécifiques aux invaders...
}
