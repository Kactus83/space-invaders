import { ISkill } from "./ISkill";

export abstract class Skill implements ISkill {
    id: string;
    name: string;
    description: string;
    protected cooldown: number;
    protected lastActivationTime: number | null = null;

    constructor(id: string, name: string, description: string, cooldown: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooldown = cooldown;
    }

    abstract execute(): void;

    update(deltaTime: number): void {
        // Cette méthode peut être utilisée pour mettre à jour l'état interne des compétences au fil du temps.
    }

    isReady(): boolean {
        if (!this.lastActivationTime) return true;
        return (Date.now() - this.lastActivationTime) >= this.cooldown;
    }

    resetCooldown(): void {
        this.lastActivationTime = Date.now();
    }
}
