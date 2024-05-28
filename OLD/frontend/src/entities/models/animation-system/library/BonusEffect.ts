import { IAnimationEffect } from "../types/IAnimationEffect";
import { fabric } from "fabric";

export class BonusEffect implements IAnimationEffect {
    private duration: number;
    private elapsedTime: number = 0;
    private completed: boolean = false;

    constructor(duration: number = 300) { // Durée en millisecondes
        this.duration = duration;
    }

    start(target: fabric.Object): void {
        // Initialisation de l'effet de bonus avec une ombre dynamique
        target.set({
            shadow: new fabric.Shadow({
                color: 'rgba(255, 215, 0, 0.75)', // Or pour l'effet bonus
                blur: 10,
            })
        });
        this.completed = false;
    }

    stop(target: fabric.Object): void {
        // Réinitialiser l'état original de l'ombre à la fin de l'effet
        target.set({ shadow: null });
        this.completed = true;
    }

    update(target: fabric.Object, deltaTime: number): void {
        if (this.completed) return;

        this.elapsedTime += deltaTime;
        const progress = Math.sin(this.elapsedTime / this.duration * Math.PI * 2) * 0.5 + 0.5;

        if (target.shadow instanceof fabric.Shadow) {
            target.shadow.blur = 10 + (15 * progress);
            target.shadow.color = `rgba(255, 215, 0, ${0.75 * progress})`;
        }

        if (this.elapsedTime >= this.duration) {
            this.completed = true;
            target.set({ shadow: null });
        }
    }

    isCompleted(): boolean {
        return this.completed;
    }
}
