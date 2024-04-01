import { GameEntity } from "../GameEntity";
import { HealthSystem } from "../models/health-system/HealthSystem";
import { GroundLineLevels } from "./GroundLineLevels";
import { AppConfig } from "../../core/config/AppConfig";
import { Player } from "../player/Player";
import { Projectile } from "../projectile/Projectile";
import { Wall } from "../wall/Wall";
import { Invader } from "../invader/Invader";
import { GameBonus } from "../bonus/GameBonus";

export class GroundLine extends GameEntity {
    public  level: number = 1;
    public healthSystem: HealthSystem;

    constructor() {
        super();
        // On utilise directement le niveau 1 pour la configuration de la GroundLine,
        // étant donné qu'on n'a prévu qu'un seul niveau pour le moment.
        const groundLineCharacteristics = GroundLineLevels[this.level];
        this.healthSystem = new HealthSystem(this, groundLineCharacteristics);
    }

    protected async loadDesign(): Promise<void> {
        const config = AppConfig.getInstance();
        const design = this.themeManager.getTheme().getGroundLineDesign(this.level); // Récupération du design depuis le gestionnaire de thème
        
        // Placement de la GroundLine en bas du canvas avec la hauteur spécifiée (30px)
        const position = {
            x: 0, // Démarre à gauche du canvas
            y: config.canvasHeight - 30 // Positionné à 30px du bas du canvas
        };

        // Utilisation de la méthode createFabricObject pour créer l'objet fabric à partir du design
        this.fabricObject = await this.createFabricObject(design, position);
        
        // Ajustement de l'objet pour occuper toute la largeur du canvas
        if (this.fabricObject) {
            this.fabricObject.set({
                width: config.canvasWidth,
                height: 30, // Hauteur fixée à 30px
                selectable: false, // Non sélectionnable
                hasControls: false, // Sans contrôles
                hasBorders: false // Sans bordures
            });
            this.shouldUpdateDesign = false; // Le design ne nécessite plus de mise à jour
        }
    }

    update(deltaTime: number): void {
        // La GroundLine n'a pas besoin de mise à jour logique dans la boucle de jeu.
        // Vous pourriez ajouter une logique de vérification des collisions ici si nécessaire.
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            // Logique de collision avec les joueurs
        } else if (entity instanceof Projectile) {
            this.healthSystem.takeDamage(entity.healthSystem.damage);
        } else if (entity instanceof Wall) {
            console.log("PLAYER hit wall");
            // Logique de collision avec les murs
        } else if (entity instanceof Invader) {
            this.healthSystem.takeDamage(entity.healthSystem.damage);
        } else if (entity instanceof GameBonus) {
            // Logique de collision avec les bonus
        } else {
            throw new Error("Unknown entity type");
        }
    }
}
