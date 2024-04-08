import { fabric } from "fabric";
import { IAnimationEffect } from "../types/IAnimationEffect";

export class ShieldEffect implements IAnimationEffect {
    private duration: number;
    private elapsedTime: number = 0;
    private completed: boolean = false;
    private originalStroke: string | undefined;
    private originalStrokeWidth: number;

    constructor(duration: number = 250) { // Durée en millisecondes
        this.duration = duration;
    }

    start(target: fabric.Object): void {
        // Sauvegardez les propriétés de contour originales
        this.originalStroke = target.stroke;
        this.originalStrokeWidth = target.strokeWidth || 0;
        
        // Configurez l'objet pour afficher l'effet de bouclier
        target.stroke = '#00BFFF'; // Couleur cyan pour l'effet bouclier
        target.strokeWidth = 5; // Épaisseur du trait pour rendre l'effet plus visible
    }

    update(target: fabric.Object, deltaTime: number): void {
        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.duration && !this.completed) {
            // L'animation est terminée, rétablissez les propriétés du contour
            target.stroke = this.originalStroke;
            target.strokeWidth = this.originalStrokeWidth;
            this.completed = true;
        }
    }

    isCompleted(): boolean {
        return this.completed;
    }
}
