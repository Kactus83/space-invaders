import { IAnimationEffect } from "../types/IAnimationEffect";
import { fabric } from "fabric";

export class ShieldEffect implements IAnimationEffect {
    private duration: number;
    private elapsedTime: number = 0;

    constructor(duration: number = 500) {
        this.duration = duration;
    }

    start(target: fabric.Object): void {
        // Initialisation de l'effet, par exemple, définir une ombre initiale ou une bordure
        target.set({
            shadow: new fabric.Shadow({
                color: '#00BFFF',
                blur: 20,
            })
        });
    }

    update(target: fabric.Object, deltaTime: number): void {
        this.elapsedTime += deltaTime;
        const progress = Math.min(this.elapsedTime / this.duration, 1);
        const intensity = Math.sin(progress * Math.PI); // Sinus pour une animation en douceur

        // Mettre à jour l'effet visuel selon le progrès
        (target.shadow as fabric.Shadow).blur = 20 * intensity;
        (target.shadow as fabric.Shadow).color = `rgba(0, 191, 255, ${intensity})`; // Cyan avec variation d'opacité

        if (progress === 1) {
            // Nettoyage après la fin de l'animation
            target.set({ shadow: null });
        }
    }

    isCompleted(): boolean {
        return this.elapsedTime >= this.duration;
    }
}
