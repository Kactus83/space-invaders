import { GameEntity } from "../../entities/GameEntity";
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

    private areColliding(entityA: ICollidable, entityB: ICollidable): boolean {
        const boundsA = entityA.getCollisionBounds();
        const boundsB = entityB.getCollisionBounds();

        return !(boundsA.x + boundsA.width < boundsB.x ||
                 boundsB.x + boundsB.width < boundsA.x ||
                 boundsA.y + boundsA.height < boundsB.y ||
                 boundsB.y + boundsB.height < boundsA.y);
    }
}