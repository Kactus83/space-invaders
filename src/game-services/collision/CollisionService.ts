import { GameEntity } from "../../entities/GameEntity";
import { GroundLine } from "../../entities/ground-line/GroundLine";
import { Player } from "../../entities/player/Player";
import { Wall } from "../../entities/wall/Wall";
import { ICollidable } from "./ICollidable";

export class CollisionService {
    private entities: GameEntity[] = [];

    public checkCollisions(): void {
        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                let entityA = this.entities[i];
                let entityB = this.entities[j];

                if (this.areColliding(entityA, entityB)) {
                    entityA.onCollisionWith(entityB);
                    entityB.onCollisionWith(entityA);
                }
            }
        }
    }

    private shouldCheckCollision(entityA: GameEntity, entityB: GameEntity): boolean {
        // Évitez les collisions entre les murs
        if (entityA instanceof Wall && entityB instanceof Wall) {
            return false;
        }
    
        // Évitez les collisions entre le joueur et les murs/groundline
        if (entityA instanceof Player && (entityB instanceof Wall || entityB instanceof GroundLine)) {
            return false;
        }
    
        if (entityB instanceof Player && (entityA instanceof Wall || entityA instanceof GroundLine)) {
            return false;
        }
    
        // Ajoutez d'autres conditions selon les besoins de votre jeu
        return true;
    }

    private areColliding(entityA: ICollidable, entityB: ICollidable): boolean {
        const boundsA = entityA.getCollisionBounds();
        const boundsB = entityB.getCollisionBounds();

        return !(boundsA.x + boundsA.width < boundsB.x ||
                 boundsB.x + boundsB.width < boundsA.x ||
                 boundsA.y + boundsA.height < boundsB.y ||
                 boundsB.y + boundsB.height < boundsA.y);
    }

    public registerEntity(entity: GameEntity): void {
        if (!this.entities.includes(entity)) {
            this.entities.push(entity);
        }
    }
    
    public unregisterEntity(entity: GameEntity): void {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }    
}