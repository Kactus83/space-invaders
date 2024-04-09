import { fabric } from "fabric";
import { Skill } from "../../entities/models/skill-system/skill/Skill";
import { AppConfig } from "../../core/config/AppConfig";

export class SkillDisplayComponent {
    private skills: Skill[] = [];
    private fabricObjects: fabric.Object[] = [];
    private config = {
        leftColumnOffset: 10,
        centerColumnOffset: 300, 
        rightColumnOffset: 590,
        topOffset: 120,
        spacing: 30
    };

    constructor(skills: Skill[]) {
        this.skills = skills;
        this.updateDisplay();
    }

    updateDisplay(): void {
        this.fabricObjects = []; 
        let leftIndex = 0;
        let centerIndex = 0;
        let rightIndex = 0;

        // Trier les compétences en trois groupes
        this.skills.forEach(skill => {
            if (skill.isPermanent) {
                // Compétences permanentes à droite
                const text = this.createSkillText(`${skill.name}`, this.config.rightColumnOffset, rightIndex * this.config.spacing + this.config.topOffset, 'lightgreen');
                const textWidth = text.width;
                const adjustedLeft = AppConfig.getInstance().canvasWidth - textWidth - 5;
                text.set({ left: adjustedLeft });
                rightIndex++;
                this.fabricObjects.push(text);
            } else if (skill.isActive) {
                // Compétences actives au milieu
                const remainingTime = skill.getRemainingActivationTime() / 1000; // Converti en secondes
                const text = this.createSkillText(`${skill.name}: Active - ${remainingTime.toFixed(2)}s`, this.config.centerColumnOffset, centerIndex * this.config.spacing + this.config.topOffset, 'orange');
                centerIndex++;
                this.fabricObjects.push(text);
            } else {
                // Compétences disponibles ou en cooldown à gauche
                const remainingTime = skill.getRemainingCooldownTime() / 1000; // Converti en secondes
                const text = this.createSkillText(`${skill.name}: Cooldown - ${remainingTime.toFixed(1)}`, this.config.leftColumnOffset, leftIndex * this.config.spacing + this.config.topOffset, 'lightgray');
                leftIndex++;
                this.fabricObjects.push(text);
            }
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
