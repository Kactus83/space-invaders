import { IAnimationEffect } from "../types/IAnimationEffect";
import { fabric } from "fabric";

export class SkillEffect implements IAnimationEffect {
    private duration: number;
    private elapsedTime: number = 0;
    private completed: boolean = false;

    constructor(duration: number = 400) { // Durée en millisecondes
        this.duration = duration;
    }

    start(target: fabric.Object): void {
        // Définir une ombre pour l'activation de la compétence
        target.set({
            shadow: new fabric.Shadow({
                color: 'rgba(255, 140, 0, 0.75)', // Orange pour l'effet de compétence
                blur: 10,
            })
        });
        this.completed = false;
    }

    stop(target: fabric.Object): void {
        // Nettoyer l'effet visuel à la fin
        target.set({ shadow: null });
        this.completed = true;
    }

    update(target: fabric.Object, deltaTime: number): void {
        if (this.completed) return;

        this.elapsedTime += deltaTime;
        const progress = Math.sin(this.elapsedTime / this.duration * Math.PI * 2) * 0.5 + 0.5;

        if (target.shadow instanceof fabric.Shadow) {
            target.shadow.blur = 10 + (20 * progress); // Une pulsation plus marquée que le bonus
            target.shadow.color = `rgba(255, 140, 0, ${0.75 * progress})`;
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
