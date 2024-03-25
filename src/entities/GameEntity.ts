import { fabric } from "fabric";
import { IRenderable } from "../core/renderer/Irenderable";
import { ICollidable } from "../game-services/collision/ICollidable";
import { GameEntityType } from "./types/GameEntityType";
import { ThemeManager } from "../themes/services/ThemeManager";
import { IDesign } from "../themes/types/IDesign";

export abstract class GameEntity implements IRenderable, ICollidable {
    protected themeManager: ThemeManager = ThemeManager.getInstance();
    protected fabricObject: fabric.Object;
    public entityType: GameEntityType;
    protected shouldUpdateDesign: boolean = true;

    constructor() {
    }


    async getDrawableObjects(): Promise<fabric.Object[]> {
        if (this.shouldUpdateDesign) {
            await this.loadDesign();
        }
        return [this.fabricObject];
    }

    protected abstract loadDesign(): Promise<void>;
    
    protected async createFabricObject(design: IDesign, position: { x: number, y: number }): Promise<fabric.Object> {
        if (!design.svgPath) {
            throw new Error("Design SVG path is required");
        }
    
        return new Promise<fabric.Object>((resolve, reject) => {
            fabric.loadSVGFromURL(design.svgPath, (objects, options) => {
                if (!objects || !objects.length) {
                    reject(new Error(`Failed to load SVG from ${design.svgPath}`));
                    return;
                }
                console.log("Loaded SVG", design.svgPath, objects, options);

                const svgObject = fabric.util.groupSVGElements(objects, options);

                svgObject.set({
                    left: position.x,
                    top: position.y,
                    hasControls: false,
                    hasBorders: false,
                    selectable: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    scaleX: design.width / svgObject.width,
                    scaleY: design.height / svgObject.height,
                });

                resolve(svgObject);

            }, (error: any) => {
                reject(new Error(`Failed to load SVG from ${design.svgPath}: ${error}`));
            });
        });
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
    
    /**
     * Updates the entity's state. Can be overridden by subclasses to implement specific behavior.
     * @param deltaTime The time elapsed since the last update call, in milliseconds.
     */
    abstract update(deltaTime: number): void;
}
