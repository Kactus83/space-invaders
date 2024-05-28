import { fabric } from "fabric";
import { IRenderable } from "../services/renderer/Irenderable";
import { ICollidable } from "../services/collision/ICollidable";
import { GameEntityType } from "./types/GameEntityType";
import { ThemeManager } from "../themes/services/ThemeManager";
import { IDesign } from "../themes/types/IDesign";
import { EntityState } from "./types/EntityState";
import { AppConfig } from "../config/AppConfig";
import { AnimationSystem } from "./models/animation-system/AnimationSystem";
import { CollisionZone } from "../services/collision/CollisionZone";

export abstract class GameEntity implements IRenderable, ICollidable {
    private collisionZonesCache: Set<CollisionZone> | null = null;
    private lastBounds: { x: number, y: number, width: number, height: number } | null = null;
    public state: EntityState = EntityState.Active;
    protected themeManager: ThemeManager = ThemeManager.getInstance();
    public animationSystem: AnimationSystem = new AnimationSystem(this);
    public fabricObject: fabric.Object;
    public entityType: GameEntityType;
    public isInitialized: boolean = false;
    public shouldUpdateDesign: boolean = true;

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
    
    isInWallCollisionZone(): boolean {
        const config = AppConfig.getInstance();
        const wallCollisionZoneTop = (config.wall_InitialY - 10) - (config.wall_Size * 15); // Zone de collision en dessous de cette valeur

        return this.getCollisionBounds().y + this.getCollisionBounds().height >= wallCollisionZoneTop;
    }

    getCollisionZones(): Set<CollisionZone> {
        const currentBounds = this.getCollisionBounds();
        if (!this.lastBounds || !this.boundsAreEqual(currentBounds, this.lastBounds)) {
            this.lastBounds = currentBounds;
            this.collisionZonesCache = this.calculateCollisionZones();
        }
        return this.collisionZonesCache;
    }

    private boundsAreEqual(a: { x: number, y: number, width: number, height: number }, b: { x: number, y: number, width: number, height: number }): boolean {
        return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
    }

    private calculateCollisionZones(): Set<CollisionZone> {
        const zones = new Set<CollisionZone>();
        const bounds = this.getCollisionBounds();
        const config = AppConfig.getInstance();

        // Déterminer les limites des zones
        const zoneWidth = config.canvasWidth / 3;
        const leftZoneEnd = zoneWidth;
        const rightZoneStart = zoneWidth * 2;

        // Vérifie la présence de l'entité dans chaque zone
        if (bounds.x < leftZoneEnd) zones.add(CollisionZone.Left);
        if (bounds.x + bounds.width > rightZoneStart) zones.add(CollisionZone.Right);
        if ((bounds.x + bounds.width > leftZoneEnd && bounds.x < rightZoneStart) ||
            (bounds.x < leftZoneEnd && bounds.x + bounds.width > rightZoneStart)) zones.add(CollisionZone.Center);
        if (this.isInWallCollisionZone()) zones.add(CollisionZone.WallCollisionZone);

        return zones;
    }

    abstract onCollisionWith(entity: GameEntity): void;
    
    /**
     * Updates the entity's state. Can be overridden by subclasses to implement specific behavior.
     * @param deltaTime The time elapsed since the last update call, in milliseconds.
     */
    abstract update(deltaTime: number): void;
}
