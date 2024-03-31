import { AppConfig } from "../../../../core/config/AppConfig";
import { GameEntity } from "../../../GameEntity";
import { GameBonus } from "../../../bonus/GameBonus";
import { IBonusEmitterCharacteristics } from "./IBonusEmitterCharacteristics";

export class BonusEmitterSystem {
    private characteristics: IBonusEmitterCharacteristics;
    private preparedBonus: GameBonus | null = null;
    private owner: GameEntity;

    constructor(owner: GameEntity, characteristics: IBonusEmitterCharacteristics) {
        this.owner = owner;
        this.characteristics = characteristics;
    }

    public emitBonus(): GameBonus | null {
        if (Math.random() <= this.characteristics.emitProbability) {
            const bonusType = this.characteristics.bonusTypes[Math.floor(Math.random() * this.characteristics.bonusTypes.length)];
            const initialPosition = { x: Math.random() * AppConfig.getInstance().canvasWidth, y: 0 };
            return new GameBonus(bonusType, initialPosition);
        }
        return null;
    }

    public update(deltaTime: number): void {
        // Voir si vraiment nécessaire
    }

    // Méthode pour mettre à jour les caractéristiques du système émetteur de bonus, si nécessaire
    public updateCharacteristics(newCharacteristics: IBonusEmitterCharacteristics): void {
        this.characteristics = newCharacteristics;
    }
    
    // Préparer un bonus potentiel
    public prepareBonus(): void {
        if (Math.random() <= this.characteristics.emitProbability) {
            const bonusType = this.characteristics.bonusTypes[
                Math.floor(Math.random() * this.characteristics.bonusTypes.length)
            ];
            const initialPosition = { x: Math.random() * AppConfig.getInstance().canvasWidth, y: -50 }; // Exemple d'initialisation hors du canvas
            this.preparedBonus = new GameBonus(bonusType, initialPosition);
            this.preparedBonus.init();
        }
    }

    // Récupérer le bonus préparé, si disponible
    public getPreparedBonus(): GameBonus | null {
        const bonus = this.preparedBonus;
        this.preparedBonus = null; // Réinitialiser après récupération pour éviter de le récupérer à nouveau
        return bonus;
    }
}
