import { ThemeManager } from "../../themes/services/ThemeManager";
import { GameEntity } from "../GameEntity";
import { BonusType } from "../models/bonus-system/BonusType";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { Player } from "../player/Player";
import { GameBonusType } from "./GameBonusTypeS";
import { GameBonusSpecs } from "./GameBonusTypesSpecs";

export class GameBonus extends GameEntity {
    initialPosition: { x: number, y: number };
    bonus: BonusType;
    type: GameBonusType;
    speedSystem: SpeedSystem;

    constructor(type: GameBonusType, initialPosition: { x: number, y: number }) {
        super();
        this.initialPosition = initialPosition;
        this.type = type;
        const characteristics = GameBonusSpecs[type];
        this.bonus = characteristics.bonus;
        this.speedSystem = new SpeedSystem(this, characteristics);
        // Initialisation supplémentaire si nécessaire
    }

    protected async loadDesign(): Promise<void> {
        const themeManager = ThemeManager.getInstance();
        const design = themeManager.getTheme().getGameBonusDesign(this.type);
        // Supposons que createFabricObject accepte un objet de design qui contient le chemin vers l'image SVG et d'autres propriétés
        this.fabricObject = await this.createFabricObject(design, { x: this.initialPosition.x, y: this.initialPosition.y });
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
