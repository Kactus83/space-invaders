import { BaseEntity } from '../BaseEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../../themes/ThemeManager';

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
        // Mettre à jour la position du joueur à gauche
        console.log("move left");
        this.fabricObject.left -= 10; // Exemple de déplacement
    }

    moveRight(): void {
        // Mettre à jour la position du joueur à droite
        console.log("move right");
        this.fabricObject.left += 10; // Exemple de déplacement
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
                    const svg = fabric.util.groupSVGElements(objects, options);
                    this.fabricObject = svg.set({
                        left: this.x, // Utilisez x, y fournis au constructeur pour positionner
                        top: this.y,
                        scaleX: theme.width, // Assurez-vous que ces valeurs sont correctes
                        scaleY: theme.height,
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
                console.log("fabric object : ", this.fabricObject);
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
