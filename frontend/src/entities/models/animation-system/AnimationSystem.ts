import { GameEntity } from "../../GameEntity";
import { BonusEffect } from "./library/BonusEffect";
import { FlashEffect } from "./library/FlashEffect";
import { HealEffect } from "./library/HealEffect";
import { HitEffect } from "./library/HitEffect";
import { PlayerDamageEffect } from "./library/PlayerDamageEffect";
import { ShieldEffect } from "./library/ShieldEffect";
import { SkillEffect } from "./library/SkillEffect";
import { IAnimationEffect } from "./types/IAnimationEffect";

export class AnimationSystem {
    owner: GameEntity;
    private activeEffects: IAnimationEffect[] = [];

    constructor(owner: GameEntity) {
        this.owner = owner;
    }

    startEffect(newEffect: IAnimationEffect): void {
        // Recherchez et arrêtez un effet actif du même type
        this.activeEffects.forEach(effect => {
            if (effect.constructor.name === newEffect.constructor.name) {
                effect.stop(this.owner.fabricObject);
            }
        });
    
        // Nettoyez les effets arrêtés avant d'ajouter le nouvel effet
        this.activeEffects = this.activeEffects.filter(effect => !effect.isCompleted());
    
        // Démarrer le nouvel effet
        newEffect.start(this.owner.fabricObject);
        console.log('Starting effect', newEffect.constructor.name);
        this.activeEffects.push(newEffect);
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

    startPlayerDamageAnimation(): void {
        this.startEffect(new PlayerDamageEffect());
    }

    startHitAnimation(): void {
        this.startEffect(new HitEffect());
    }

    startShieldAnimation(): void {
        this.startEffect(new ShieldEffect());
    }

    startHealAnimation(): void {
        this.startEffect(new HealEffect());
    }

    startBonusAnimation(): void {
        this.startEffect(new BonusEffect());
    }

    startSkillAnimation(): void {
        this.startEffect(new SkillEffect());
    }
}
