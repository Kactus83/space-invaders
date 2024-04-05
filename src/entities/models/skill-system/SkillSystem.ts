import { Skill } from "./Skill";

export class SkillSystem {
    private skills: Skill[] = [];
    private activeSkills: string[] = [];

    constructor() {
        this.initializeSkills();
    }

    initializeSkills(): void {
        // Ajouter les compétences initiales ici
    }

    addSkill(skill: Skill): void {
        this.skills.push(skill);
        if (skill.isPermanent) {
            skill.activate(); // Activer immédiatement les compétences permanentes
        }
    }

    useSkill(skillId: string): void {
        const skill = this.skills.find(s => s.id === skillId);
        if (skill && skill.isReady()) {
            skill.activate();
        }
    }

    update(deltaTime: number): void {
        this.skills.forEach(skill => skill.update(deltaTime));
    }

    isSkillActive(skillId: string): boolean {
        const skill = this.skills.find(s => s.id === skillId);
        return skill ? skill.isActive() : false;
    }
}