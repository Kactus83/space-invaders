import { BaseEntity } from '../BaseEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../../themes/ThemeManager';
import { InvaderType } from '../types/InvaderType';
import { InvaderSpecs } from './InvaderTypesSpecs';
import { config } from '../../../config/config';

export class Invader extends BaseEntity {
    type: InvaderType;
    hp: number;
    speed: number;
    score: number;

    constructor(themeManager: ThemeManager, type: InvaderType, x: number, y: number) {
        super(themeManager, x, y);
        this.type = type;
        const specs = InvaderSpecs[type];
        this.hp = specs.hp;
        this.speed = specs.speed;
        this.score = specs.score;
        this.loadDesign();
    }

    public async loadDesign(): Promise<void> {
        const design = this.themeManager.getInvaderDesign(this.type.toString());
        if (design.svgPath) {
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
        // Calcul du déplacement potentiel
        let potentialLeft = this.fabricObject.left + (this.speed * deltaTime);
    
        // Vérification si l'invader va dépasser le bord gauche du canvas
        if (potentialLeft < 0) {
            this.speed *= -1; // Inverser la direction
            potentialLeft = Math.abs(potentialLeft); // Réajuster la position pour rester dans le canvas
            this.fabricObject.top += 60; // Descendre d'une ligne
        }
        // Vérification si l'invader va dépasser le bord droit du canvas
        else if (potentialLeft + this.fabricObject.width > config.canvas.width) {
            this.speed *= -1; // Inverser la direction
            potentialLeft = config.canvas.width - (potentialLeft + this.fabricObject.width - config.canvas.width) - this.fabricObject.width; // Réajuster pour rester dans le canvas
            this.fabricObject.top += 60; // Descendre d'une ligne
        }
    
        // Appliquer le déplacement calculé
        this.fabricObject.left = potentialLeft;
    }
    
    
}
