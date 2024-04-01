import { fabric } from "fabric";
import { SystemBonus } from "../../entities/models/bonus-system/system-bonus/SystemBonus";

export class BonusDisplayComponent {
    private bonuses: SystemBonus[] = [];
    private fabricObjects: fabric.Object[] = [];

    constructor(bonuses: SystemBonus[]) {
        this.bonuses = bonuses;
        this.updateDisplay();
    }

    updateDisplay(): void {
        this.fabricObjects = []; // Reset the fabric objects

        this.bonuses.forEach((bonus, index) => {
            const bonusName = bonus.effect.name; // Utilise le nom descriptif du bonus
            const bonusState = this.formatBonusState(bonus.getState()); // Formatage de l'état du bonus pour l'affichage
            const bonusTextContent = `${bonusName} - ${bonusState}`;

            const bonusText = new fabric.Text(bonusTextContent, {
                left: 10,
                top: index * 30 + 50, // Espacement vertical pour éviter la superposition
                fontSize: 14,
                fill: 'lightgreen', // Choisissez une couleur qui se démarque ou qui correspond au type de bonus
                fontFamily: 'Arial', // Utilisez la police qui correspond au style de votre jeu
            });
            this.fabricObjects.push(bonusText);
        });
    }

    getDrawableObjects(): fabric.Object[] {
        return this.fabricObjects;
    }

    setBonuses(bonuses: SystemBonus[]): void {
        this.bonuses = bonuses;
        this.updateDisplay();
    }

    private formatBonusState(state: 'available' | 'active' | 'expired'): string {
        switch (state) {
            case 'available':
                return 'Prêt';
            case 'active':
                return 'Actif';
            case 'expired':
                return 'Expiré';
            default:
                return 'Inconnu';
        }
    }
}