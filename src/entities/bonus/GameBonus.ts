import { GameEntity } from "../GameEntity";
import { BonusType } from "../models/bonus-system/BonusType";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { Player } from "../player/Player";
import { IGameBonusCharacteristics } from "./IGameBonusCharacteristics";

export class GameBonus extends GameEntity {
    bonus: BonusType;
    speedSystem: SpeedSystem;

    constructor(characteristics: IGameBonusCharacteristics) {
        super();
        this.bonus = characteristics.bonus;
        this.speedSystem = new SpeedSystem(this, characteristics);
        // Initialisation supplémentaire si nécessaire
    }

    protected async loadDesign(): Promise<void> {
        // Chargement du design SVG basé sur le type de bonus
    }

    public update(deltaTime: number): void {
        // Logique de mise à jour du bonus
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            // Appliquer l'effet du bonus au joueur
            // Supprimer le bonus de la scène
        }
    }

    // Méthodes update et getCollisionBounds selon les besoins
}
