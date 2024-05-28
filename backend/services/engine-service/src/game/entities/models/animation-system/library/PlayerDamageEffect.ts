import { IAnimationEffect } from "../types/IAnimationEffect";
import { fabric } from "fabric";

export class PlayerDamageEffect implements IAnimationEffect {
    private duration: number;
    private elapsedTime: number = 0;
    private completed: boolean = false;

    constructor(duration: number = 150) { // Durée plus courte pour une réaction rapide
        this.duration = duration;
    }

    start(target: fabric.Object): void {
        // Initie l'effet avec une ombre rouge intense
        target.set({
            shadow: new fabric.Shadow({
                color: 'rgba(255, 0, 0, 0.8)', // Rouge pour indiquer le dommage
                blur: 15, // Un flou plus important pour un effet dramatique
            })
        });
        this.completed = false;
    }

    stop(target: fabric.Object): void {
        // Réinitialiser l'ombre pour terminer l'effet de manière propre
        target.set({ shadow: null });
        this.completed = true;
    }

    update(target: fabric.Object, deltaTime: number): void {
        if (this.completed) return;

        this.elapsedTime += deltaTime;
        // Utilise une progression linéaire pour un effet rapide sans pulsation
        const progress = Math.min(this.elapsedTime / this.duration, 1);

        if (target.shadow instanceof fabric.Shadow) {
            target.shadow.blur = 25 * (1 - progress); // Diminuez le flou pour une disparition rapide
            target.shadow.color = `rgba(255, 0, 0, ${0.8 * (1 - progress)})`; // Diminuez l'opacité pour estomper l'effet
        }

        if (progress === 1) {
            this.completed = true;
            target.set({ shadow: null });
        }
    }

    isCompleted(): boolean {
        return this.completed;
    }
}
