import { fabric } from "fabric";
import { Skill } from "../../entities/models/skill-system/skill/Skill";
import { AppConfig } from "../../config/AppConfig";

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
    
        this.skills.forEach(skill => {
            let text, remainingTime;
    
            if (skill.isPermanent) {
                // Compétences permanentes à droite
                text = this.createSkillText(`${skill.name}`, this.config.rightColumnOffset, rightIndex * this.config.spacing + this.config.topOffset, 'lightgreen');
                rightIndex++;
            } else {
                remainingTime = skill.getRemainingCooldownTime() / 1000; // Converti en secondes
                const statusText = remainingTime > 0 ? `Cooldown - ${remainingTime.toFixed(1)}s` : "Available";
                const color = remainingTime > 0 ? 'lightgray' : 'lightblue'; // Utiliser une couleur différente pour indiquer la disponibilité
    
                if (skill.isActive) {
                    // Compétences actives au milieu
                    remainingTime = skill.getRemainingActivationTime() / 1000; // Converti en secondes
                    text = this.createSkillText(`${skill.name}: Active - ${remainingTime.toFixed(2)}s`, this.config.centerColumnOffset, centerIndex * this.config.spacing + this.config.topOffset, 'orange');
                    centerIndex++;
                } else {
                    // Compétences disponibles ou en cooldown à gauche
                    text = this.createSkillText(`${skill.name}: ${statusText}`, this.config.leftColumnOffset, leftIndex * this.config.spacing + this.config.topOffset, color);
                    leftIndex++;
                }
            }
    
            // Ajustement pour aligner les textes à droite
            if (text && skill.isPermanent) {
                const textWidth = text.width;
                const adjustedLeft = AppConfig.getInstance().canvasWidth - textWidth - 5;
                text.set({ left: adjustedLeft });
            }
    
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
