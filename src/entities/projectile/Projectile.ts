import { GameEntity } from "../GameEntity";
import { ProjectileType } from "./ProjectileType";
import { Player } from "../player/Player";
import { Invader } from "../invader/Invader";
import { Wall } from "../wall/Wall";
import { ProjectileSpecs } from "./ProjectilesTypesSpecs";
import { EntityState } from "../types/EntityState";
import { HealthSystem } from "../models/health-system/HealthSystem";
import { IProjectileCharacteristics } from "./IProjectileCharacteristics";
import { GroundLine } from "../ground-line/GroundLine";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { GameBonus } from "../bonus/GameBonus";
import { SkillsIds } from "../models/skill-system/types/SkillsIds";

export class Projectile extends GameEntity {
    private x_Position: number;
    private y_Position: number;
    public origin: GameEntity;
    public projectileType: ProjectileType;
    private speedSystem: SpeedSystem;
    public healthSystem: HealthSystem;

    constructor(origin: GameEntity, type: ProjectileType, initialPosition: { x: number, y: number }) {
        super();
        this.x_Position = initialPosition.x;
        this.y_Position = initialPosition.y;
        this.origin = origin;
        this.projectileType = type;
        const specs: IProjectileCharacteristics = ProjectileSpecs[type];
        this.speedSystem = new SpeedSystem(this, specs);
        // Initialise le système de santé avec les spécifications du projectile
        this.healthSystem = new HealthSystem(this, specs);
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getProjectileDesign(this.projectileType);
        this.fabricObject = await this.createFabricObject(design, { x: this.x_Position, y: this.y_Position});
        this.shouldUpdateDesign = false;
    }
    
    update(deltaTime: number): void {
        // Convertit deltaTime de millisecondes en secondes pour la cohérence des unités
        const deltaTimeInSeconds = deltaTime / 1000;
    
        // Détermine la direction du déplacement en fonction de l'origine du projectile
        const direction = this.origin instanceof Player ? -1 : 1;
    
        // Met à jour la position y du projectile en fonction de la vitesse et de la direction
        if (this.fabricObject) {
            this.fabricObject.top += this.speedSystem.moveSpeed * deltaTimeInSeconds * direction;
            this.y_Position = this.fabricObject.top;
            this.x_Position = this.fabricObject.left;
        }
        
        if (this.y_Position < 0 - this.fabricObject.height) {
            this.state = EntityState.ToBeRemoved; // Marque le projectile pour suppression si sorti de l'écran
        }
    }

    onCollisionWith(entity: GameEntity): void {

        if (entity instanceof Player) {

            
            if(this.origin instanceof Player) {
                this.fabricObject.top = this.fabricObject.top - 1;
                return;
            }

            this.healthSystem.onCollision(entity.healthSystem);
            if(this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }

        } else if (entity instanceof Invader) {
            if(this.origin instanceof Invader) {
                return;
            }
            this.healthSystem.onCollision(entity.healthSystem);
            if(this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }

        } else if (entity instanceof Wall) {
            this.state = EntityState.ToBeRemoved;

        } else if (entity instanceof GameBonus) {
            if(this.origin instanceof Player && this.origin.skillSystem.isSkillActive(SkillsIds.PickupBonus)) {
                this.state = EntityState.ToBeRemoved;
            }

        } else if (entity instanceof Projectile) {
            this.healthSystem.onCollision(entity.healthSystem);
            if(this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }

        } else if (entity instanceof GroundLine) {
            this.state = EntityState.ToBeRemoved;
            
        } else {
            throw new Error("Unknown entity type in collision");
        }
    }
}
