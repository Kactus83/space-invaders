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
        this.fabricObjects = []; // Reset the fabric objects
        const config = { leftOffset: 10, topOffset: 100, spacing: 30 }; // Adjust topOffset to avoid overlap with bonuses

        // Display skills with their status
        this.skills.forEach((skill, index) => {
            const color = skill.isActive ? 'orange' : 'lightgray'; // Active skills in orange, inactive in gray
            const text = this.createSkillText(skill, config.leftOffset, index * config.spacing + config.topOffset, color);
            this.fabricObjects.push(text);
        });
    }

    getDrawableObjects(): fabric.Object[] {
        return this.fabricObjects;
    }

    setSkills(skills: Skill[]): void {
        this.skills = skills;
        this.updateDisplay();
    }

    private createSkillText(skill: Skill, left: number, top: number, color: string): fabric.Text {
        const skillInfo = `${skill.name}: ${skill.isActive ? "Active" : "Cooldown"}`;
        return new fabric.Text(skillInfo, {
            left,
            top,
            fontSize: 14,
            fill: color,
            fontFamily: 'Arial',
        });
    }
}
