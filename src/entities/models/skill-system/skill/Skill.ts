import { SkillsIds } from "../types/SkillsIds";
import { ISkill } from "./ISkill";

export abstract class Skill implements ISkill {
    id: SkillsIds;
    name: string;
    description: string;
    experiencePointsCost: number;
    protected cooldown: number;
    protected duration: number;
    protected lastActivationTime: number | null = null;
    isPermanent: boolean;

    constructor(id: SkillsIds, name: string, description: string, cooldown: number, duration: number, experiencePointsCost: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooldown = cooldown;
        this.duration = duration;
        this.isPermanent = duration === 0;
        this.experiencePointsCost = experiencePointsCost;
    }

    activate(): void {
        if (!this.isReady()) return;
        this.lastActivationTime = Date.now();
    }

    isReady(): boolean {
        if (this.isPermanent) return true;
        if (!this.lastActivationTime) return true;
        const timePassed = Date.now() - this.lastActivationTime;
        return timePassed > this.cooldown;
    }

    isActive(): boolean {
        if (this.isPermanent) return true;
        if (!this.lastActivationTime) return false;
        const timeActive = Date.now() - this.lastActivationTime;
        return timeActive <= this.duration;
    }

    update(deltaTime: number): void {}
}