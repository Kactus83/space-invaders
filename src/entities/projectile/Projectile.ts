import { GameEntity } from "../GameEntity";
import { ProjectileType } from "./ProjectileType";
import { Player } from "../player/Player";
import { Invader } from "../invader/Invader";
import { Wall } from "../wall/Wall";
import { ProjectileSpecs } from "./ProjectilesTypesSpecs";
import { ProjectileOrigin } from "./ProjectileOrigin";

export class Projectile extends GameEntity {
    speed: number;
    damage: number;
    origin: ProjectileOrigin;
    projectileType: ProjectileType;

    constructor(origin: ProjectileOrigin, type: ProjectileType, initialPosition: { x: number, y: number }) {
        super();
        this.origin = origin;
        this.projectileType = type;
        const specs = ProjectileSpecs[type];
        this.speed = specs.speed;
        this.damage = specs.damage;

        // TODO: Initialisation du fabricObject avec les paramètres positionnels
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getProjectileDesign(this.projectileType);
        this.fabricObject = await this.createFabricObject(design);
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            console.log('Projectile collided with Player');
            // Spécifiez la logique de collision avec le joueur
        } else if (entity instanceof Invader) {
            console.log('Projectile collided with Invader');
            // Spécifiez la logique de collision avec un invader
        } else if (entity instanceof Wall) {
            console.log('Projectile collided with Wall');
            // Spécifiez la logique de collision avec un mur
        } else if (entity instanceof Projectile) {
            console.log('Projectile collided with another Projectile');
            // Spécifiez la logique de collision avec un autre projectile
        } else {
            throw new Error("Unknown entity type in collision");
        }
    }
}
