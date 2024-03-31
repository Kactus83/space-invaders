import { AppConfig } from "../../core/config/AppConfig";
import { ThemeManager } from "../../themes/services/ThemeManager";
import { GameEntity } from "../GameEntity";
import { GroundLine } from "../ground-line/GroundLine";
import { BonusType } from "../models/bonus-system/BonusType";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { Player } from "../player/Player";
import { EntityState } from "../types/EntityState";
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
        // Vérifier si l'objet fabric existe avant de tenter de le déplacer
        if (this.fabricObject) {
            // Convertir deltaTime de millisecondes à secondes pour le calcul de la vitesse
            const deltaTimeInSeconds = deltaTime / 1000;
    
            // Calculer le déplacement basé sur la vitesse du bonus
            const movement = this.speedSystem.moveSpeed * deltaTimeInSeconds;
    
            // Mettre à jour la position verticale du bonus
            this.fabricObject.top += movement;
    
            // Vérifier si le bonus est sorti du bas du canvas et le marquer pour suppression si nécessaire
            if (this.fabricObject.top > AppConfig.getInstance().canvasHeight) {
                this.state = EntityState.ToBeRemoved;
            }
        }
    }   

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            // Appliquer le bonus au joueur
        }
        if (entity instanceof GroundLine) {
            this.state = EntityState.ToBeRemoved;
        }
    }

    // Méthodes update et getCollisionBounds selon les besoins
}
