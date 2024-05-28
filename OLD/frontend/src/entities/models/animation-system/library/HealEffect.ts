import { IAnimationEffect } from "../types/IAnimationEffect";
import { fabric } from "fabric";

export class HealEffect implements IAnimationEffect {
    private duration: number;
    private elapsedTime: number = 0;
    private completed: boolean = false;
    private originalOpacity: number;

    constructor(duration: number = 750) { // Durée en millisecondes
        this.duration = duration;
    }

    start(target: fabric.Object): void {
        // Sauvegardez l'opacité originale pour pouvoir la rétablir plus tard
        this.originalOpacity = target.opacity || 1;

        // Définir une aura de guérison autour de l'objet
        target.set({
            shadow: new fabric.Shadow({
                color: 'rgba(124, 252, 0, 0.75)', // Couleur vert clair pour l'effet de guérison
                blur: 30,
            })
        });
        this.completed = false;
    }

    stop(target: fabric.Object): void {
        // Rétablir l'état original de l'objet
        target.set({
            opacity: this.originalOpacity,
            shadow: null
        });
        this.completed = true;
    }

    update(target: fabric.Object, deltaTime: number): void {
        if (this.completed) return;

        this.elapsedTime += deltaTime;
        const progress = Math.min(this.elapsedTime / this.duration, 1);
        const pulseIntensity = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5; // Créer un effet pulsant

        // Mettre à jour l'ombre pour créer un effet pulsant
        if (target.shadow instanceof fabric.Shadow) {
            target.shadow.blur = 20 + (10 * pulseIntensity);
            target.shadow.color = `rgba(124, 252, 0, ${0.5 + (0.25 * pulseIntensity)})`; // Intensifier la couleur progressivement
        }

        if (progress === 1) {
            this.completed = true;
            target.set({ shadow: null }); // Nettoyer l'effet à la fin
        }
    }

    isCompleted(): boolean {
        return this.completed;
    }
}
