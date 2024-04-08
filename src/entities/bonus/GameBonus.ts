import { AppConfig } from "../../core/config/AppConfig";
import { ThemeManager } from "../../themes/services/ThemeManager";
import { GameEntity } from "../GameEntity";
import { GroundLine } from "../ground-line/GroundLine";
import { SystemBonusType } from "../models/bonus-system/system-bonus/SystemBonusType";
import { ExperienceBonus } from "../models/experience-system/bonus/ExperienceBonus";
import { HealthBonus } from "../models/health-system/bonus/HealthBonus";
import { SkillBonus } from "../models/skill-system/bonus/SkillBonus";
import { SkillsIds } from "../models/skill-system/types/SkillsIds";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { SpeedBonus } from "../models/speed-system/bonus/SpeedBonus";
import { WeaponBonus } from "../models/weapon-system/bonus/WeaponBonus";
import { Player } from "../player/Player";
import { Projectile } from "../projectile/Projectile";
import { EntityState } from "../types/EntityState";
import { GameBonusType } from "./GameBonusTypes";
import { GameBonusSpecs } from "./GameBonusTypesSpecs";

export class GameBonus extends GameEntity {
    initialPosition: { x: number, y: number };
    private targetX: number;
    private lastChangeTime: number = 0;
    private systemBonus: SystemBonusType;
    type: GameBonusType;
    speedSystem: SpeedSystem;

    constructor(type: GameBonusType, initialPosition: { x: number, y: number }) {
        super();
        this.initialPosition = initialPosition;
        this.type = type;
        const characteristics = GameBonusSpecs[type];
        this.systemBonus = characteristics.systemBonus;
        this.speedSystem = new SpeedSystem(this, characteristics);
        this.targetX = Math.random() * AppConfig.getInstance().canvasWidth;
        // Initialisation supplémentaire si nécessaire
    }

    getSystemBonus(): SystemBonusType {
        return this.cloneSystemBonus();
    }

    public cloneSystemBonus(): SystemBonusType {
        if (this.systemBonus instanceof HealthBonus) {
            return new HealthBonus(this.systemBonus.getEffect());
        }else if (this.systemBonus instanceof SpeedBonus) {
            return new SpeedBonus(this.systemBonus.getEffect());
        }else if (this.systemBonus instanceof WeaponBonus) {
            return new WeaponBonus(this.systemBonus.getEffect());
        }else if (this.systemBonus instanceof ExperienceBonus) {
            return new ExperienceBonus(this.systemBonus.getEffect());
        }else if (this.systemBonus instanceof SkillBonus) {
            return new SkillBonus(this.systemBonus.getEffect()); 
        }
    }

    protected async loadDesign(): Promise<void> {
        const themeManager = ThemeManager.getInstance();
        const design = themeManager.getTheme().getGameBonusDesign(this.type);
        // Supposons que createFabricObject accepte un objet de design qui contient le chemin vers l'image SVG et d'autres propriétés
        this.fabricObject = await this.createFabricObject(design, { x: this.initialPosition.x, y: this.initialPosition.y });
    }

    public update(deltaTime: number): void {
        if (!this.fabricObject) return;
    
        const deltaTimeInSeconds = deltaTime / 1000;
        const verticalMovement = this.speedSystem.moveSpeed * deltaTimeInSeconds;
        this.fabricObject.top += verticalMovement;
    
        // Dérive latérale vers la position cible
        if (Math.random() < AppConfig.getInstance().shiftX_Probability) {

            this.animationSystem.startFlashAnimation();
            
            // Déterminer la direction de la dérive basée sur la position cible
            const direction = this.targetX > this.fabricObject.left ? 1 : -1;
            // Calculer le mouvement latéral avec une valeur aléatoire jusqu'à shiftX_max
            const lateralMovement = direction * (Math.random() * AppConfig.getInstance().shiftX_max);
            this.fabricObject.left += lateralMovement;
            
            // Assurer que le bonus reste dans les limites du canvas
            this.fabricObject.left = Math.max(0, Math.min(this.fabricObject.left, AppConfig.getInstance().canvasWidth - this.fabricObject.width));
        }
    
        // Vérifier si le bonus a atteint sa cible X ou est sorti du bas du canvas
        if (Math.abs(this.fabricObject.left - this.targetX) < AppConfig.getInstance().shiftX_max || this.fabricObject.top > AppConfig.getInstance().canvasHeight) {
            if (this.fabricObject.top > AppConfig.getInstance().canvasHeight) {
                this.state = EntityState.ToBeRemoved;
            } else {
                // Changer la position cible X
                this.targetX = Math.random() * AppConfig.getInstance().canvasWidth;
            }
        }

        this.animationSystem.update(deltaTime);
    }
        

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            this.state = EntityState.ToBeRemoved;
        }
        if (entity instanceof GroundLine) {
            this.state = EntityState.ToBeRemoved;
        }
        if (entity instanceof Projectile) {
            if (entity.origin instanceof Player && entity.origin.skillSystem.isSkillActive(SkillsIds.PickupBonus)) {
                entity.origin.bonusManagementSystem.addBonus(this.systemBonus);
                this.state = EntityState.ToBeRemoved;
            }
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
