import { GameEntity } from "../GameEntity";
import { ProjectileType } from "./ProjectileType";
import { Player } from "../player/Player";
import { Invader } from "../invader/Invader";
import { Wall } from "../wall/Wall";
import { ProjectileSpecs } from "./ProjectilesTypesSpecs";

export class Projectile extends GameEntity {
    x_Position: number;
    y_Position: number;
    speed: number;
    damage: number;
    origin: GameEntity;
    projectileType: ProjectileType;

    constructor(origin: GameEntity, type: ProjectileType, initialPosition: { x: number, y: number }) {
        super();
        this.x_Position = initialPosition.x;
        this.y_Position = initialPosition.y;
        this.origin = origin;
        this.projectileType = type;
        const specs = ProjectileSpecs[type];
        this.speed = specs.speed;
        this.damage = specs.damage;
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
            this.fabricObject.top += this.speed * deltaTimeInSeconds * direction;
            this.y_Position = this.fabricObject.top;
            this.x_Position = this.fabricObject.left;
        }
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            console.log('Projectile collided with Player');
            // Spécifiez la logique de collision avec le joueur
        } else if (entity instanceof Invader) {
            console.log('Projectile collided with Invader');
            // Spécifiez la logique de collision avec un invader
        } else if (entity instanceof Wall) {
            console.log('Projectile collided with Wall');
            // Spécifiez la logique de collision avec un mur
        } else if (entity instanceof Projectile) {
            console.log('Projectile collided with another Projectile');
            // Spécifiez la logique de collision avec un autre projectile
        } else {
            throw new Error("Unknown entity type in collision");
        }
    }
}
