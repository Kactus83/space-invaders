import { IAnimationEffect } from "../types/IAnimationEffect";

export class HitEffect implements IAnimationEffect {
    private duration: number;
    private elapsedTime: number = 0;
    private completed: boolean = false;
    private originalOpacity: number;
    private originalScaleX: number;
    private originalScaleY: number;
    private centerX: number;
    private centerY: number;
    private xMoveSinceStart: number = 0;

    constructor(duration: number = 150) { // Durée en millisecondes
        this.duration = duration;
    }

    start(target: fabric.Object): void {
        this.originalOpacity = target.opacity || 1;
        this.originalScaleX = target.scaleX || 1;
        this.originalScaleY = target.scaleY || 1;
        
        // Assurez-vous que le point d'origine est au centre pour le rétrécissement centré
        target.originX = 'center';
        target.originY = 'center';
        // Réinitialisez xMoveSinceStart à chaque début d'animation.
        this.xMoveSinceStart = 0;
        
        // Sauvegardez la position centrale initiale
        this.centerX = target.left + target.width * target.scaleX / 2;
        this.centerY = target.top + target.height * target.scaleY / 2;
    }

    stop(target: fabric.Object): void {
        target.set({
            'opacity': this.originalOpacity,
            'scaleX': this.originalScaleX,
            'scaleY': this.originalScaleY
        });
    
        // Si vous avez modifié originX et originY pour l'effet, réinitialisez-les ici
        target.originX = 'left';
        target.originY = 'top';
    
        // Réinitialisez la position pour compenser le mouvement effectué pendant l'effet
        target.set({
            left: this.centerX - target.width * this.originalScaleX / 2 + this.xMoveSinceStart,
            top: this.centerY - target.height * this.originalScaleY / 2,
        });
    
        this.completed = true;
    }
        
    update(target: fabric.Object, deltaTime: number): void {
        this.elapsedTime += deltaTime;
        // Calculez le nouveau centre après mise à jour.
        const newCenterX = target.left + target.width * target.scaleX / 2;

        // Mettez à jour xMoveSinceStart avec le déplacement depuis la dernière mise à jour.
        this.xMoveSinceStart += newCenterX - this.centerX;

        // Mise à jour de this.centerX pour la prochaine itération.
        this.centerX = newCenterX;
    
        if (this.elapsedTime < this.duration) {
            const progress = Math.sin((this.elapsedTime / this.duration) * Math.PI);
            const scaleProgress = 1 - (0.2 * progress);

            console.log('progress', progress, 'scaleProgress', scaleProgress);
    
            target.set({
                opacity: this.originalOpacity * progress * 2,
                scaleX: this.originalScaleX * scaleProgress,
                scaleY: this.originalScaleY * scaleProgress,
            });
    
            // Réajustez left et top pour maintenir le centre
            target.set({
                left: this.centerX - target.width * target.scaleX / 2,
                top: this.centerY - target.height * target.scaleY / 2,
            });
        } else if (!this.completed) {
            // Rétablissez l'état original de l'objet une fois l'animation terminée
            target.set({
                opacity: this.originalOpacity,
                scaleX: this.originalScaleX,
                scaleY: this.originalScaleY,
                top: this.centerY - target.height * this.originalScaleY / 2,
            });
    
            // Réinitialisez le point d'origine si nécessaire
            target.originX = 'left';
            target.originY = 'top';
    
            this.completed = true;
        }
    }     

    isCompleted(): boolean {
        return this.completed;
    }
}
