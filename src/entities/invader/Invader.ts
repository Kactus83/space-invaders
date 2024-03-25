import { GameEntity } from "../GameEntity";
import { ProjectileType } from "../projectile/ProjectileType";
import { InvaderType } from "./InvaderType";
import { InvaderSpecs } from "./InvaderTypesSpecs";
import { Player } from "../player/Player";
import { Projectile } from "../projectile/Projectile";
import { Wall } from "../wall/Wall";
import { HealthState } from "../types/HealthState";

export class Invader extends GameEntity {
    hp: number;
    speed: number;
    score: number;
    damage: number;
    projectileType: ProjectileType;
    fireRate: number;
    shootProbability: number;
    public healthState: HealthState = HealthState.New

    constructor(public type: InvaderType) {
        super();
        const specs = InvaderSpecs[type];
        this.hp = specs.hp;
        this.speed = specs.speed;
        this.score = specs.score;
        this.damage = specs.damage;
        this.projectileType = specs.projectileType;
        this.fireRate = specs.fireRate;
        this.shootProbability = specs.shootProbability || 0;
        // Initialisation du fabricObject à venir
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getInvaderDesign(this.type, this.healthState);
        this.fabricObject = await this.createFabricObject(design);
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
    

    // Méthodes spécifiques aux invaders...
}
