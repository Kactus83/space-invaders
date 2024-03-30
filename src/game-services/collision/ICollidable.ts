import { GameEntity } from "../../entities/GameEntity";
import { GameEntityType } from "../../entities/types/GameEntityType";

/**
 * Interface for entities that can collide with other entities
 * @interface
 */
export interface ICollidable {
    getCollisionBounds(): { x: number, y: number, width: number, height: number };
    onCollisionWith(entity: GameEntity): void; 
    isInCollisionZone(): boolean;
    entityType: GameEntityType; 
}