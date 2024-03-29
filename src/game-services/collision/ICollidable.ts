import { GameEntity } from "../../entities/GameEntity";
import { GameEntityType } from "../../entities/types/GameEntityType";

export interface ICollidable {
    getCollisionBounds(): { x: number, y: number, width: number, height: number };
    onCollisionWith(entity: GameEntity): void; 
    entityType: GameEntityType; 
}