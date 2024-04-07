import { fabric } from "fabric";
import { SystemBonus } from "../../entities/models/bonus-system/system-bonus/SystemBonus";

export class BonusDisplayComponent {
    private bonuses: SystemBonus[] = [];
    private activeBonuses: SystemBonus[] = [];
    private fabricObjects: fabric.Object[] = [];

    constructor(bonuses: SystemBonus[], activeBonuses: SystemBonus[]) {
        this.bonuses = bonuses;
        this.activeBonuses = activeBonuses;
        this.updateDisplay();
    }

    updateDisplay(): void {
        this.fabricObjects = []; // Reset the fabric objects
        const config = { leftOffset: 10, topOffset: 50, spacing: 30 };

        // Display available bonuses on the left side
        this.bonuses.forEach((bonus, index) => {
            const text = this.createBonusText(bonus, config.leftOffset, index * config.spacing + config.topOffset, 'lightgreen');
            this.fabricObjects.push(text);
        });

        // Display active bonuses on the right side
        const rightOffset = 300; // Adjust based on your UI layout
        this.activeBonuses.forEach((bonus, index) => {
            const text = this.createBonusText(bonus, rightOffset, index * config.spacing + config.topOffset, 'orange');
            this.fabricObjects.push(text);
        });
    }

    getDrawableObjects(): fabric.Object[] {
        return this.fabricObjects;
    }

    setBonuses(bonuses: SystemBonus[], activeBonuses: SystemBonus[]): void {
        this.bonuses = bonuses;
        this.activeBonuses = activeBonuses;
        this.updateDisplay();
    }

    private createBonusText(bonus: SystemBonus, left: number, top: number, color: string): fabric.Text {
        let bonusName = bonus.effect.casualName;
        let bonusState = this.formatBonusState(bonus.getState());
        
        // Si le bonus est actif, incluez le temps restant dans l'affichage
        if (bonus.getState() === 'active') {
            bonusName = this.cleanBonusName(bonusName);
            const remainingTime = (bonus.getRemainingDuration() / 1000).toFixed(2); // Convertir en secondes et formater
            bonusState += ` - ${remainingTime}s`;
        }
        
        const bonusTextContent = `${bonusName} - ${bonusState}`;
        
        return new fabric.Text(bonusTextContent, {
            left,
            top,
            fontSize: 14,
            fill: color,
            fontFamily: 'Arial',
        });
    } 

    private cleanBonusName(bonusName: string): string {
        // Recherche de la dernière occurrence d'un espace, supposant que la durée est après cet espace
        const lastSpaceIndex = bonusName.lastIndexOf(" ");
        if (lastSpaceIndex > -1) {
            // Retourne la chaîne sans la partie de la durée
            return bonusName.substring(0, lastSpaceIndex);
        }
        // Si aucun espace n'est trouvé, retourne le nom tel quel
        return bonusName;
    }
       

    private formatBonusState(state: 'available' | 'active' | 'expired'): string {
        switch (state) {
            case 'available': return 'Prêt';
            case 'active': return 'Actif';
            case 'expired': return 'Expiré';
            default: return 'Inconnu';
        }
    }
}
