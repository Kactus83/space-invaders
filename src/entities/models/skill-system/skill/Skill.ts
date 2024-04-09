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
    isPermanent: boolean;
    isActive: boolean;

    constructor(id: SkillsIds, name: string, description: string, cooldown: number, duration: number, experiencePointsCost: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooldown = cooldown;
        this.duration = duration;
        this.isPermanent = duration === 0;
        this.experiencePointsCost = experiencePointsCost;
        this.isActive = this.isPermanent; // Si permanent, alors toujours actif, sinon inactif au départ
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
        if (this.isPermanent) return true; // Les compétences permanentes sont toujours "prêtes"
        if (!this.lastActivationTime) return true;
        const timePassed = Date.now() - this.lastActivationTime;
        return timePassed >= this.cooldown;
    }

    update(deltaTime: number): void {
        if (!this.isPermanent && this.lastActivationTime) {
            const timeActive = Date.now() - this.lastActivationTime;
            if (this.isActive && timeActive >= this.duration) {
                this.deactivate(); // Désactiver automatiquement après la durée
            }
        }
    }

    getRemainingActivationTime(): number {
        if (this.isPermanent || !this.lastActivationTime) return 0;
        const timePassed = Date.now() - this.lastActivationTime;
        return Math.max(0, this.cooldown - timePassed);
    }
}
