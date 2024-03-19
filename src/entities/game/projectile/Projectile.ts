import { BaseEntity } from '../BaseEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../../themes/ThemeManager';
import { ProjectileSpecs } from './ProjectilesTypesSpecs';
import { ProjectileType } from './ProjectileType';
import { ProjectileOrigin } from './Projectileorigin';

export class Projectile extends BaseEntity {
    type: ProjectileType;
    origin: ProjectileOrigin;
    damage: number;
    speed: number;

    constructor(themeManager: ThemeManager, type: ProjectileType, x: number, y: number, origin: ProjectileOrigin) {
        super(themeManager, x, y);
        this.type = type;
        const specs = ProjectileSpecs[type];
        this.speed = specs.speed;
        this.damage = specs.damage;
        this.origin = origin;
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
            // Les projectiles des invaders se déplacent vers le bas, ceux du joueur vers le haut
            const direction = this.origin === ProjectileOrigin.Invader ? 1 : -1;
            this.fabricObject.top += this.speed * deltaTime * direction;
        }
    }    
}
