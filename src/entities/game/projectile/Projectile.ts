import { BaseEntity } from '../BaseEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../../themes/ThemeManager';
import { ProjectileType } from '../types/ProjectileType';
import { ProjectileSpecs } from './ProjectilesTypesSpecs';

export class Projectile extends BaseEntity {
    type: ProjectileType;
    damage: number;
    speed: number;

    constructor(themeManager: ThemeManager, type: ProjectileType, x: number, y: number) {
        super(themeManager, x, y);
        this.type = type;
        const specs = ProjectileSpecs[type];
        this.speed = specs.speed;
        this.damage = specs.damage;
        this.loadDesign();
    }

    public async loadDesign(): Promise<void> {
        const design = this.themeManager.getProjectileDesign(this.type);
        // Similar logic to Player for loading SVG or simple shape
        if (design.svgPath) {
            await new Promise<void>((resolve, reject) => {
                fabric.loadSVGFromURL(design.svgPath, (objects, options) => {
                    const svg = fabric.util.groupSVGElements(objects, options);
                    this.fabricObject = svg.set({
                        left: this.x,
                        top: this.y,
                        scaleX: design.width / svg.width,
                        scaleY: design.height / svg.height,
                    });
                    resolve();
                });
            });
        } else {
            this.fabricObject = new fabric.Rect({
                left: this.x,
                top: this.y,
                fill: design.color,
                width: design.width,
                height: design.height,
            });
        }
    }

    update(deltaTime: number): void {
        if (this.fabricObject) {
            this.fabricObject.top -= this.speed * deltaTime;
            // Additional logic for off-screen handling or collisions
        }
    }
}
