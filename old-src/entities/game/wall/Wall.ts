import { BaseEntity } from '../BaseEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../../themes/ThemeManager';
import { WallType } from './WallType';
import { WallSpecs } from './WallSpecs';

export class Wall extends BaseEntity {
    type: WallType;
    hp: number;
    damage: number;

    constructor(themeManager: ThemeManager, type: WallType, x: number, y: number) {
        super(themeManager, x, y);
        this.type = type;
        this.hp = WallSpecs[type].hp;
        this.damage = WallSpecs[type].damage;
        this.loadDesign();
    }

    public async loadDesign(): Promise<void> {
        const design = this.themeManager.getWallDesign(this.type);
        await new Promise<void>((resolve) => {
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
    }

    update(deltaTime: number): void {
        // Gestion spécifique du mur si nécessaire.
    }

    applyDamage(damage: number): boolean {
        this.hp -= damage;
        if (this.hp <= 0) {
            // Le mur est détruit
            return true;
        } else {
            // Mettre à jour le type et le design si nécessaire, par exemple, pour indiquer des dommages visuels
            this.updateTypeAndDesign();
            return false;
        }
    }

    private updateTypeAndDesign(): void {
        // Mettre à jour le type et le design du mur en fonction des points de vie restants
        if (this.hp > WallSpecs[WallType.Strong].hp) {
            this.type = WallType.Strong;
        } else if (this.hp > WallSpecs[WallType.Basic].hp) {
            this.type = WallType.Basic;
        } else {
            this.type = WallType.Damaged;
        }
        this.loadDesign();
    }
}
