import { IGameEntity } from '../IGameEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../themes/ThemeManager';

export class Player implements IGameEntity {
    public fabricObject: fabric.Object; // Changez le type à fabric.Object pour supporter différents types (Rect, SVG, etc.)
    public level: number = 1; // Ajoutez une propriété pour le niveau

    constructor(private themeManager: ThemeManager, private canvas: fabric.Canvas, x: number, y: number) {
        this.loadDesign(); // Chargez le design initial
    }

    update(deltaTime: number): void {
        // Mettre à jour la logique du joueur, incluant potentiellement la mise à jour du niveau
        // Si le niveau change, mettez à jour le design
    }

    render(): void {
        // Assurez-vous que l'objet est ajouté ou mis à jour sur le canvas
        if (!this.canvas.contains(this.fabricObject)) {
            this.canvas.add(this.fabricObject);
        } else {
            this.canvas.renderAll();
        }
    }

    private loadDesign(): void {
        const theme = this.themeManager.getPlayerDesign(this.level);

        // Chargez le SVG si disponible
        if (theme.svgPath) {
            fabric.loadSVGFromURL(theme.svgPath, (objects, options) => {
                const svg = fabric.util.groupSVGElements(objects, options);
                this.fabricObject = svg.set({
                    left: svg.left,
                    top: svg.top,
                    scaleX: theme.width,
                    scaleY: theme.height,
                });
                this.render(); // Actualisez le rendu après le chargement du SVG
            });
        } else {
            // Si pas de SVG, utilisez un Rect ou un autre objet Fabric simple
            this.fabricObject = new fabric.Rect({
                left: 100, // Exemple, utilisez vos propres coordonnées
                top: 100,
                fill: theme.color,
                width: theme.width,
                height: theme.height,
            });
            this.render();
        }
    }

    public setLevel(newLevel: number): void {
        if (newLevel !== this.level) {
            this.level = newLevel;
            this.loadDesign(); // Rechargez le design lors du changement de niveau
        }
    }
}
