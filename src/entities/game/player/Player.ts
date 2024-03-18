import { BaseEntity } from '../BaseEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../../themes/ThemeManager';
import { config } from '../../../config/config';
import { MaxLevel, PlayerLevelThresholds } from './PlayerLevels';

export class Player extends BaseEntity {
    public level: number = 1;
    public score: number = 0;
    public health: number = 3;

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
            this.fabricObject.left = newLeft;
        }
    }

    shoot(): void {
        // Implémenter la logique de tir
        console.log("shoot");
    }

    public async loadDesign(): Promise<void> {
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

                resolve();
            }
        });
    }    

    public increaseScore(points: number): void {
        this.score += points;
        this.checkForLevelUp();
    }

    private async checkForLevelUp(): Promise<void> {
        for (let level = 2; level <= MaxLevel; level++) {
            if (this.score >= PlayerLevelThresholds[level as keyof typeof PlayerLevelThresholds] && this.level < level) {
                await this.setLevel(level);
                break; // Arrêtez de vérifier une fois qu'un niveau supérieur est trouvé et appliqué
            }
        }
    }

    public async setLevel(newLevel: number): Promise<void> {
        if (newLevel !== this.level && newLevel <= MaxLevel) {
            this.level = newLevel;
            // Mettez à jour le design du joueur ici si nécessaire
            // Par exemple, charger un nouveau design basé sur le niveau
            await this.loadDesign();
        }
    }
}
