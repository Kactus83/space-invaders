import { fabric } from "fabric";
import { Skill } from "../../entities/models/skill-system/skill/Skill";

export class SkillDisplayComponent {
    private skills: Skill[] = [];
    private fabricObjects: fabric.Object[] = [];

    constructor(skills: Skill[]) {
        this.skills = skills;
        this.updateDisplay();
    }

    updateDisplay(): void {
        this.fabricObjects = []; // Réinitialisez les objets fabric
        const config = { leftOffset: 10, topOffset: 100, spacing: 30 };

        // Affiche les compétences avec leur statut
        this.skills.forEach((skill, index) => {
            let color = 'lightgray'; // Compétences inactives en gris
            let statusText = "Cooldown";
            if (skill.isPermanent) {
                color = 'lightgreen'; // Compétences permanentes en vert
                statusText = "Permanent";
            } else if (skill.isActive) {
                color = 'orange'; // Compétences actives en orange
                const remainingTime = skill.getRemainingActivationTime() / 1000; // Converti en secondes
                statusText = `Active - ${remainingTime.toFixed(1)}s`;
            }
            const skillInfo = `${skill.name}: ${statusText}`;
            const text = this.createSkillText(skillInfo, config.leftOffset, index * config.spacing + config.topOffset, color);
            this.fabricObjects.push(text);
        });
    }
    
    setSkills(skills: Skill[]): void {
        this.skills = skills;
        this.updateDisplay();
    }

    getDrawableObjects(): fabric.Object[] {
        return this.fabricObjects;
    }

    private createSkillText(skillInfo: string, left: number, top: number, color: string): fabric.Text {
        return new fabric.Text(skillInfo, {
            left,
            top,
            fontSize: 14,
            fill: color,
            fontFamily: 'Arial',
        });
    }
}
