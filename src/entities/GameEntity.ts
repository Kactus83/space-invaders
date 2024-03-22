import { fabric } from "fabric";
import { IRenderable } from "../core/renderer/Irenderable";
import { ICollidable } from "../game-services/collision/ICollidable";
import { GameEntityType } from "./GameEntityType";

export abstract class GameEntity implements IRenderable, ICollidable {
    abstract getDrawableObjects(): fabric.Object[];
    abstract getCollisionBounds(): { x: number, y: number, width: number, height: number };
    abstract onCollisionWith(entity: GameEntity): void;
    abstract entityType: GameEntityType;
}
