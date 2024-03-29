import { fabric } from "fabric";
import { IRenderable } from "../core/renderer/Irenderable";
import { ICollidable } from "../game-services/collision/ICollidable";
import { GameEntityType } from "./types/GameEntityType";
import { ThemeManager } from "../themes/services/ThemeManager";
import { IDesign } from "../themes/types/IDesign";
import { EntityState } from "./types/EntityState";
import { AppConfig } from "../core/config/AppConfig";

export abstract class GameEntity implements IRenderable, ICollidable {
    public state: EntityState = EntityState.Active;
    protected themeManager: ThemeManager = ThemeManager.getInstance();
    protected fabricObject: fabric.Object;
    public entityType: GameEntityType;
    public isInitialized: boolean = false;
    protected shouldUpdateDesign: boolean = true;

    constructor() {
    }


    async getDrawableObjects(): Promise<fabric.Object[]> {
        if (this.shouldUpdateDesign) {
            await this.loadDesign();
        }
        return [this.fabricObject];
    }

    async init(): Promise<void> {
        if (!this.isInitialized) {
            await this.loadDesign();
            this.isInitialized = true;
        }
    }

    protected abstract loadDesign(): Promise<void>;
    
    protected async createFabricObject(design: IDesign, position: { x: number, y: number }): Promise<fabric.Object> {
        if (!design.svgPath) {
            throw new Error("Design SVG path is required");
        }
    
        return new Promise<fabric.Object>((resolve, reject) => {
            fabric.loadSVGFromURL(design.svgPath, (objects, options) => {
                if (!objects || objects.length === 0) {
                    reject(new Error(`Failed to load SVG from ${design.svgPath}`));
                    return;
                }
    
                const svgObject = fabric.util.groupSVGElements(objects, options);
                svgObject.set({
                    left: position.x,
                    top: position.y,
                    scaleX: design.width / svgObject.width,
                    scaleY: design.height / svgObject.height,
                    hasControls: false,
                    hasBorders: false,
                    selectable: false,
                    lockMovementX: true,
                    lockMovementY: true
                });
    
                resolve(svgObject);
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
    
    isInCollisionZone(): boolean {
        const config = AppConfig.getInstance();
        const wallCollisionZoneTop = config.wall_InitialY - (config.wall_Size * 10); // Zone de collision en dessous de cette valeur

        return this.getCollisionBounds().y + this.getCollisionBounds().height >= wallCollisionZoneTop;
    }

    abstract onCollisionWith(entity: GameEntity): void;
    
    /**
     * Updates the entity's state. Can be overridden by subclasses to implement specific behavior.
     * @param deltaTime The time elapsed since the last update call, in milliseconds.
     */
    abstract update(deltaTime: number): void;
}
