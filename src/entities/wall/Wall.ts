import { GameEntity } from "../GameEntity";
import { Player } from "../player/Player";
import { Projectile } from "../projectile/Projectile";
import { Invader } from "../invader/Invader";
import { WallType } from "./WallType";
import { WallSpecs } from "./WallSpecs";
import { HealthSystem } from "../models/health-system/HealthSystem";
import { EntityState } from "../types/EntityState";

export class Wall extends GameEntity {
    private initialPosition: { x: number, y: number };
    public healthSystem: HealthSystem;

    constructor(public type: WallType, initialPosition: { x: number, y: number }) {
        super();
        this.initialPosition = initialPosition;
        const specs = WallSpecs[type];
        this.healthSystem = new HealthSystem(this, specs);
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getWallDesign(this.type);
            
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
        this.shouldUpdateDesign = false;
    }
    
    update(deltaTime: number): void {
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            console.log("Wall collided with Player");
            // Logique de collision avec le joueur
        } else if (entity instanceof Projectile) {
            this.healthSystem.takeDamage(entity.healthSystem.damage);
            console.log(this.healthSystem.health);
            if(this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }
        } else if (entity instanceof Invader) {
            this.healthSystem.takeDamage(entity.healthSystem.damage);
            if(this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }
        }
        // Pas de cas de collision mur-mur prévu
    }

    public cleanup(): void {
        // Nettoyage des ressources
    }

    // Méthodes supplémentaires spécifiques au mur si nécessaire
}
