import { AppConfig } from "../../core/config/AppConfig";
import { ThemeManager } from "../../themes/services/ThemeManager";
import { GameEntity } from "../GameEntity";
import { GroundLine } from "../ground-line/GroundLine";
import { SystemBonusType } from "../models/bonus-system/system-bonus/SystemBonusType";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { Player } from "../player/Player";
import { EntityState } from "../types/EntityState";
import { GameBonusType } from "./GameBonusTypes";
import { GameBonusSpecs } from "./GameBonusTypesSpecs";

export class GameBonus extends GameEntity {
    initialPosition: { x: number, y: number };
    systemBonus: SystemBonusType;
    type: GameBonusType;
    speedSystem: SpeedSystem;

    constructor(type: GameBonusType, initialPosition: { x: number, y: number }) {
        super();
        this.initialPosition = initialPosition;
        this.type = type;
        const characteristics = GameBonusSpecs[type];
        this.systemBonus = characteristics.systemBonus;
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
                console.log('Bonus is out of canvas');
                this.state = EntityState.ToBeRemoved;
            }
        }
    }   

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            this.state = EntityState.ToBeRemoved;
        }
        if (entity instanceof GroundLine) {
            this.state = EntityState.ToBeRemoved;
        }
    }

    public setPosition(position: { x: number, y: number }): void {
        if (this.fabricObject) {
            this.fabricObject.left = position.x;
            this.fabricObject.top = position.y;
            this.shouldUpdateDesign = false;
        } else {
            // Si l'objet Fabric.js n'est pas encore créé, ajustez l'initialPosition ou gérez autrement
            this.initialPosition = position;
            this.shouldUpdateDesign = false;
        }
    }
}
