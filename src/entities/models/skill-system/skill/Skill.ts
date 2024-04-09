import { SkillsIds } from "../types/SkillsIds";
import { ISkill } from "./ISkill";

export abstract class Skill implements ISkill {
    id: SkillsIds;
    name: string;
    description: string;
    experiencePointsCost: number;
    public cooldown: number;
    protected duration: number;
    public lastActivationTime: number | null = null;
    public parentSkillId?: SkillsIds;
    isPermanent: boolean;
    isActive: boolean;

    constructor(id: SkillsIds, name: string, description: string, cooldown: number, duration: number, experiencePointsCost: number, parentSkillId?: SkillsIds) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooldown = cooldown;
        this.duration = duration;
        this.isPermanent = (duration === 0 && cooldown === 0);
        this.experiencePointsCost = experiencePointsCost;
        this.isActive = this.isPermanent; // Si permanent, alors toujours actif, sinon inactif au départ
        this.parentSkillId = parentSkillId;
    }

    activate(): void {
        if (!this.isReady()) return;
        this.isActive = true;
        this.lastActivationTime = Date.now();
    }

    deactivate(): void {
        this.isActive = false;
        // Réinitialiser lastActivationTime pour démarrer le cooldown
        this.lastActivationTime = Date.now();
    }
    
    isReady(): boolean {
        if (this.isPermanent) return true; // Les compétences permanentes sont toujours prêtes
        // Une compétence est prête si lastActivationTime est nul (jamais activée ou cooldown terminé)
        return this.lastActivationTime === null;
    }

    update(deltaTime: number): void {
        if (!this.isPermanent && this.lastActivationTime) {
            const currentTime = Date.now();
            const timeSinceActivation = currentTime - this.lastActivationTime;
    
            if (this.isActive) {
                // Si la compétence est active et que sa durée s'est écoulée, commencez le cooldown
                if (timeSinceActivation >= this.duration) {
                    this.isActive = false;
                    this.lastActivationTime = currentTime; // Commencez le cooldown maintenant
                }
            } else {
                // Si la compétence est en cooldown, vérifiez si le cooldown est terminé
                if (timeSinceActivation >= this.cooldown) {
                    this.lastActivationTime = null; // La compétence est prête à être réactivée
                }
            }
        }
    }

    getRemainingActivationTime(): number {
        if (this.isPermanent || !this.lastActivationTime) return 0;
        const timePassed = Date.now() - this.lastActivationTime;
        return Math.max(0, this.cooldown - timePassed);
    }

    getRemainingCooldownTime(): number {
        if (this.isPermanent || !this.lastActivationTime) return 0;
        const timePassed = Date.now() - this.lastActivationTime;
        return Math.max(0, this.cooldown - timePassed);
    }
}
