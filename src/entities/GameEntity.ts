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
    
    protected async createFabricObject(design: IDesign): Promise<fabric.Object> {
        if (!design.svgPath) {
            throw new Error("Design SVG path is required");
        }

        return new Promise<fabric.Object>((resolve, reject) => {
            fabric.loadSVGFromURL(design.svgPath, (objects, options) => {
                const svgObject = fabric.util.groupSVGElements(objects, options);
                svgObject.set({
                    scaleX: design.width / svgObject.width,
                    scaleY: design.height / svgObject.height,
                });
                resolve(svgObject);
            }, (error: any) => {
                if (error) {
                    reject(new Error("Failed to load SVG"));
                }
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
}
