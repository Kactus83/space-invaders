import { IAnimationEffect } from "../types/IAnimationEffect";
import { fabric } from "fabric";

export class ShieldEffect implements IAnimationEffect {
    private completed: boolean = false;
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
                blur: 15,
            })
        });
        this.completed = false;
    }

    stop(target: fabric.Object): void {
        // Assurez-vous d'éliminer l'ombre ou l'effet visuel spécifique du bouclier
        target.set({
            shadow: null // ou rétablissez l'ombre originale si vous l'aviez sauvegardée
        });
        this.completed = true;
    }

    update(target: fabric.Object, deltaTime: number): void {
        // Vérifiez si l'ombre existe avant de la modifier
        if (!target.shadow) {
            return; // Arrêtez la mise à jour si l'ombre n'existe plus
        }
        
        this.elapsedTime += deltaTime;
        const progress = Math.min(this.elapsedTime / this.duration, 1);
        const intensity = Math.sin(progress * Math.PI); // Sinus pour une animation en douceur
    
        // Assurez-vous que target.shadow est toujours une instance valide de fabric.Shadow
        if (target.shadow instanceof fabric.Shadow) {
            target.shadow.blur = 20 * intensity;
            target.shadow.color = `rgba(0, 191, 255, ${intensity})`; // Cyan avec variation d'opacité
        }
    
        if (progress === 1) {
            // Nettoyage après la fin de l'animation
            this.completed = true;
            target.set({ shadow: null });
        }
    }    

    isCompleted(): boolean {
        return this.elapsedTime >= this.duration;
    }
}
