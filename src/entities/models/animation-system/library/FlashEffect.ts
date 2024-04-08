import { IAnimationEffect } from "../types/IAnimationEffect";

export class FlashEffect implements IAnimationEffect {
    private duration: number;
    private elapsedTime: number = 0;
    private completed: boolean = false;
    private originalOpacity: number;

    constructor(duration: number = 125) { // Durée en millisecondes
        this.duration = duration;
    }

    start(target: fabric.Object): void {
        // Sauvegardez l'opacité originale pour pouvoir la rétablir plus tard
        this.originalOpacity = target.opacity || 1;
    }

    update(target: fabric.Object, deltaTime: number): void {
        this.elapsedTime += deltaTime;

        if (this.elapsedTime < this.duration) {
            const progress = Math.sin((this.elapsedTime / this.duration) * Math.PI); 
            target.set('opacity', 0 + (1 * progress));
        } else if (!this.completed) {
            // L'animation est terminée, rétablissez l'opacité originale
            target.set('opacity', this.originalOpacity);
            this.completed = true;
        }
    }

    isCompleted(): boolean {
        return this.completed;
    }
}
