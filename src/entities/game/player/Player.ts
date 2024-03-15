import { BaseEntity } from '../BaseEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../../themes/ThemeManager';
import { config } from '../../../config/config';

export class Player extends BaseEntity {
    public level: number = 1;
    public score: number = 0;

    constructor(themeManager: ThemeManager, x: number, y: number) {
        super(themeManager, x, y);
        this.loadDesign();
    }

    update(deltaTime: number): void {
        // Gestion spécifique du joueur
    }
    
    moveLeft(): void {
        const newLeft = this.fabricObject.left - 10;
        if (newLeft >= 0) {
            this.fabricObject.left = newLeft;
        }
    }
    
    moveRight(): void {
        const newLeft = this.fabricObject.left + 10;
        if (newLeft + this.fabricObject.width <= config.canvas.width) { 
            console.log("new left : ", newLeft, " width : ", this.fabricObject.width, " canvas width : ", config.canvas.width);
            this.fabricObject.left = newLeft;
        }
    }

    shoot(): void {
        // Implémenter la logique de tir
        console.log("shoot");
    }

    public loadDesign(): Promise<void> {
        return new Promise((resolve, reject) => {
            const theme = this.themeManager.getPlayerDesign(this.level);
            console.log("theme : ", theme);
            if (theme.svgPath) {
                fabric.loadSVGFromURL(theme.svgPath, (objects, options) => {
                    // Création de l'objet SVG
                    const svg = fabric.util.groupSVGElements(objects, options);
                    // Calcul du facteur de mise à l'échelle pour correspondre aux dimensions désirées
                    const scaleX = theme.width / svg.width;
                    const scaleY = theme.height / svg.height;
    
                    // Mise à jour des propriétés de l'objet SVG avec les nouvelles dimensions
                    this.fabricObject = svg.set({
                        left: this.x,
                        top: this.y,
                        scaleX: scaleX,
                        scaleY: scaleY,
                    });
    
                    console.log("fabric object : ", this.fabricObject);
                    resolve();
                });
            } else {
                this.fabricObject = new fabric.Rect({
                    left: this.x,
                    top: this.y,
                    fill: theme.color,
                    width: theme.width,
                    height: theme.height,
                });
                console.log("fabric object DEFAULT : ", this.fabricObject);
                resolve();
            }
        });
    }    

    public setLevel(newLevel: number): void {
        if (newLevel !== this.level) {
            this.level = newLevel;
            this.loadDesign(); 
        }
    }

    public increaseScore(points: number): void {
        this.score += points;
    }
}
