import { ISkill } from "./ISkill";

export abstract class Skill implements ISkill {
    id: string;
    name: string;
    description: string;
    cooldown: number;
    lastUsed: number | null = null;

    constructor(id: string, name: string, description: string, cooldown: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cooldown = cooldown;
    }

    // Vérifie si la compétence est prête à être utilisée
    isReady(): boolean {
        if (!this.lastUsed) return true;
        return (Date.now() - this.lastUsed) >= this.cooldown;
    }

    // Marque la compétence comme utilisée
    use(): void {
        this.lastUsed = Date.now();
        this.execute();
    }

    // Méthode à implémenter pour exécuter l'effet de la compétence
    abstract execute(): void;
}
