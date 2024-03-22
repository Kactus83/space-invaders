import { GameEntity } from "../../entities/GameEntity";
import { GameEntityType } from "../../entities/GameEntityType";

export interface ICollidable {
    getCollisionBounds(): { x: number, y: number, width: number, height: number };
    onCollisionWith(entity: GameEntity): void; 
    entityType: GameEntityType; 
}