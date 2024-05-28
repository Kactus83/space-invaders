import { GameEntity } from "../../entities/GameEntity";
import { GameEntityType } from "../../entities/types/GameEntityType";
import { CollisionZone } from "./CollisionZone";

/**
 * Interface for entities that can collide with other entities
 * @interface
 */
export interface ICollidable {
    getCollisionBounds(): { x: number, y: number, width: number, height: number };
    getCollisionZones(): Set<CollisionZone>;
    onCollisionWith(entity: GameEntity): void; 
    entityType: GameEntityType; 
}