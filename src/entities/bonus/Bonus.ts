import { GameEntity } from "../GameEntity";
import { Player } from "../player/Player";
import { IBonusCharacteristics } from "./IBonusCharacteristics";

export class Bonus extends GameEntity {
    characteristics: IBonusCharacteristics;

    constructor(characteristics: IBonusCharacteristics) {
        super();
        this.characteristics = characteristics;
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
