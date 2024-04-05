import { ISkill } from "./ISkill";

export abstract class Skill implements ISkill {
    id: string;
    name: string;
    description: string;
    protected cooldown: number;
    protected duration: number;
    protected lastActivationTime: number | null = null;
    isPermanent: boolean;

    constructor(id: string, name: string, description: string, cooldown: number, duration: number, isPermanent: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooldown = cooldown;
        this.duration = duration;
        this.isPermanent = isPermanent;
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