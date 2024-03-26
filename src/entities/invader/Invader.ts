import { GameEntity } from "../GameEntity";
import { ProjectileType } from "../projectile/ProjectileType";
import { InvaderType } from "./InvaderType";
import { InvaderSpecs } from "./InvaderTypesSpecs";
import { Player } from "../player/Player";
import { Projectile } from "../projectile/Projectile";
import { Wall } from "../wall/Wall";
import { HealthState } from "../types/HealthState";
import { AppConfig } from "../../core/config/AppConfig";

export class Invader extends GameEntity {
    private initialPosition: { x: number, y: number };
    hp: number;
    speed: number;
    score: number;
    damage: number;
    projectileType: ProjectileType;
    fireRate: number;
    shootProbability: number;
    public healthState: HealthState = HealthState.New
    private shootCallbacks: ((projectile: Projectile) => void)[] = [];
    private lastShootTime: number = 0;

    constructor(public type: InvaderType, initialPosition: { x: number, y: number }) {
        super();
        this.initialPosition = initialPosition;
        const specs = InvaderSpecs[type];
        this.hp = specs.hp;
        this.speed = specs.speed;
        this.score = specs.score;
        this.damage = specs.damage;
        this.projectileType = specs.projectileType;
        this.fireRate = specs.fireRate;
        this.shootProbability = specs.shootProbability;
        // Initialisation du fabricObject à venir
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getInvaderDesign(this.type, this.healthState);
    
        let x_position: number;
        let y_position: number;
    
        // Vérifiez si l'objet existe déjà et utilisez ses coordonnées
        if (this.fabricObject && this.fabricObject.left && this.fabricObject.top) {
            x_position = this.fabricObject.left;
            y_position = this.fabricObject.top;
        } else {
            // Sinon, utilisez les coordonnées d'apparition initiales
            x_position = this.initialPosition.x;
            y_position = this.initialPosition.y;
        }
    
        this.fabricObject = await this.createFabricObject(design, { x: x_position, y: y_position });
        // Indiquez que le design ne doit plus être mis à jour jusqu'à nouvelle instruction
        this.shouldUpdateDesign = false;
    }    

    update(deltaTime: number): void {
        const config = AppConfig.getInstance();
    
        if (this.fabricObject) {
            // Calcul du déplacement potentiel en tenant compte de deltaTime en millisecondes
            const deltaTimeInSeconds = deltaTime / 1000;
            let potentialLeft = this.fabricObject.left + (this.speed * deltaTimeInSeconds * (this.fabricObject.flipX ? -1 : 1));
        
            // Gestion du changement de direction et du déplacement vertical lorsqu'un bord est atteint
            if (potentialLeft < 0 || potentialLeft + this.fabricObject.width > config.canvasWidth) {
                this.fabricObject.flipX = !this.fabricObject.flipX; // Inverse la direction horizontale
                this.fabricObject.top += 60; // Déplacement vertical
            } else {
                // Applique le déplacement horizontal
                this.fabricObject.left = potentialLeft;
            }
    
            // Tentative de tir
            this.shoot();
        }
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            // Logique de collision avec les joueurs
        } else if (entity instanceof Projectile) {
            // Logique de collision avec les projectiles
        } else if (entity instanceof Wall) {
            // Logique de collision avec les murs
        } else if (entity instanceof Invader) {
            // Logique de collision avec les autres invaders
        } else {
            throw new Error("Unknown entity type");
        }
    }

    onShoot(callback: (projectile: Projectile) => void): void {
        this.shootCallbacks.push(callback);
    }

    private shoot(): void {
        const now = Date.now();
        const fireRateInterval = 1000 / this.fireRate;
        if (now - this.lastShootTime >= fireRateInterval && Math.random() < this.shootProbability) {
            const projectile = new Projectile(this, this.projectileType, { x: this.fabricObject.left, y: this.fabricObject.top });
            this.lastShootTime = now;
            this.shootCallbacks.forEach(callback => callback(projectile));
        }
    }
    

    // Méthodes spécifiques aux invaders...
}
