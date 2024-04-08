import { GameEntity } from "../../GameEntity";
import { FlashEffect } from "./library/FlashEffect";
import { HitEffect } from "./library/HitEffect";
import { ShieldEffect } from "./library/ShieldEffect";
import { IAnimationEffect } from "./types/IAnimationEffect";

export class AnimationSystem {
    owner: GameEntity;
    private activeEffects: IAnimationEffect[] = [];

    constructor(owner: GameEntity) {
        this.owner = owner;
    }

    startEffect(effect: IAnimationEffect): void {
        effect.start(this.owner.fabricObject);
        console.log('Starting effect', effect);
        this.activeEffects.push(effect);
    }

    update(deltaTime: number): void {
        this.activeEffects.forEach(effect => {
            effect.update(this.owner.fabricObject, deltaTime);
        });

        // Supprimez les effets terminés
        this.activeEffects = this.activeEffects.filter(effect => !effect.isCompleted());
    }

    startFlashAnimation(): void {
        this.startEffect(new FlashEffect());
    }

    startHitAnimation(): void {
        this.startEffect(new HitEffect());
    }

    startShieldAnimation(): void {
        this.startEffect(new ShieldEffect());
    }
}
