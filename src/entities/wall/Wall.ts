import { GameEntity } from "../GameEntity";
import { Player } from "../player/Player";
import { Projectile } from "../projectile/Projectile";
import { Invader } from "../invader/Invader";
import { WallType } from "./WallType";
import { WallSpecs } from "./WallSpecs";

export class Wall extends GameEntity {
    hp: number;
    damage: number;

    constructor(public type: WallType) {
        super();
        const specs = WallSpecs[this.type];
        this.hp = specs.hp;
        this.damage = specs.damage;
        // Pas d'initialisation du fabricObject ici, à ajouter plus tard
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getWallDesign(this.type);
        this.fabricObject = await this.createFabricObject(design);
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            console.log("Wall collided with Player");
            // Logique de collision avec le joueur
        } else if (entity instanceof Projectile) {
            console.log("Wall collided with Projectile");
            // Logique de collision avec un projectile
            // Potentiellement, réduire la HP du mur et/ou détruire le projectile
        } else if (entity instanceof Invader) {
            console.log("Wall collided with Invader");
            // Logique de collision avec un invader
        }
        // Pas de cas de collision mur-mur prévu
    }

    // Méthodes supplémentaires spécifiques au mur si nécessaire
}
