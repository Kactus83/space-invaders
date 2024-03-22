import { fabric } from "fabric";
import { IRenderable } from "../core/renderer/Irenderable";
import { ICollidable } from "../game-services/collision/ICollidable";
import { GameEntityType } from "./GameEntityType";

export abstract class GameEntity implements IRenderable, ICollidable {
    protected fabricObject: fabric.Object;
    public entityType: GameEntityType;

    constructor() {
    }

    getDrawableObjects(): fabric.Object[] {
        return [this.fabricObject];
    }

    getCollisionBounds(): { x: number, y: number, width: number, height: number } {

        if(!this.fabricObject) {
            throw new Error("No fabric object found for entity");
        }

        return {
            x: this.fabricObject.left,
            y: this.fabricObject.top,
            width: this.fabricObject.width,
            height: this.fabricObject.height
        };
    }

    abstract onCollisionWith(entity: GameEntity): void;
}
