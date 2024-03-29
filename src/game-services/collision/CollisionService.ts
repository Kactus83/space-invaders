import { GameEntity } from "../../entities/GameEntity";
import { GroundLine } from "../../entities/ground-line/GroundLine";
import { Invader } from "../../entities/invader/Invader";
import { Player } from "../../entities/player/Player";
import { Projectile } from "../../entities/projectile/Projectile";
import { Wall } from "../../entities/wall/Wall";
import { ICollidable } from "./ICollidable";

export class CollisionService {
    private players: Player[] = [];
    private invaders: Invader[] = [];
    private walls: Wall[] = [];
    private projectiles: GameEntity[] = [];
    private groundLines: GroundLine[] = [];

    public registerEntity(entity: GameEntity): void {
        if (entity instanceof Player) {
            this.players.push(entity);
        } else if (entity instanceof Invader) {
            this.invaders.push(entity);
        } else if (entity instanceof Wall) {
            this.walls.push(entity);
        } else if (entity instanceof Projectile) {
            this.projectiles.push(entity);
        } else if (entity instanceof GroundLine) {
            this.groundLines.push(entity);
        }
    }

    public unregisterEntity(entity: GameEntity): void {
        let array = this.getArrayForEntity(entity);
        const index = array.indexOf(entity);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    public checkCollisions(): void {
        // Vérifications des collisions pour les projectiles
        this.projectiles.forEach(projectile => {
            // Collisions entre Projectiles
            this.projectiles.forEach(other_Projectile => {
                if(projectile === other_Projectile) {
                    return;
                }
                if (this.areColliding(projectile, other_Projectile)) {
                    projectile.onCollisionWith(other_Projectile);
                    other_Projectile.onCollisionWith(projectile);
                }
            });

            // Collisions Projectile avec Invaders
            this.invaders.forEach(invader => {
                if (this.areColliding(projectile, invader)) {
                    projectile.onCollisionWith(invader);
                    invader.onCollisionWith(projectile);
                }
            });
    
            // Collision Projectile avec Player
            this.players.forEach(player => {
                if (this.areColliding(projectile, player)) {
                    projectile.onCollisionWith(player);
                    player.onCollisionWith(projectile);
                }
            });
    
            // Collision Projectile avec Walls
            this.walls.forEach(wall => {
                if (this.areColliding(projectile, wall)) {
                    projectile.onCollisionWith(wall);
                    wall.onCollisionWith(projectile);
                }
            });
    
            // Collision Projectile avec GroundLine
            this.groundLines.forEach(groundLine => {
                if (this.areColliding(projectile, groundLine)) {
                    projectile.onCollisionWith(groundLine);
                    groundLine.onCollisionWith(projectile);
                }
            });
        });
    
        // Vérifications des collisions pour les invaders
        this.invaders.forEach(invader => {
            // Collision Invader avec Player
            this.players.forEach(player => {
                if (this.areColliding(invader, player)) {
                    invader.onCollisionWith(player);
                    player.onCollisionWith(invader);
                }
            });
    
            // Collision Invader avec Walls
            this.walls.forEach(wall => {
                if (this.areColliding(invader, wall)) {
                    invader.onCollisionWith(wall);
                    wall.onCollisionWith(invader);
                }
            });
    
            // Collision Invader avec GroundLine
            this.groundLines.forEach(groundLine => {
                if (this.areColliding(invader, groundLine)) {
                    invader.onCollisionWith(groundLine);
                    groundLine.onCollisionWith(invader);
                }
            });
        });
    
        // Note: Vous pouvez ajuster et ajouter d'autres types de vérifications si nécessaire
    }    

    private areColliding(entityA: ICollidable, entityB: ICollidable): boolean {
        const boundsA = entityA.getCollisionBounds();
        const boundsB = entityB.getCollisionBounds();

        return !(boundsA.x + boundsA.width < boundsB.x ||
                 boundsB.x + boundsB.width < boundsA.x ||
                 boundsA.y + boundsA.height < boundsB.y ||
                 boundsB.y + boundsB.height < boundsA.y);
    }

    private getArrayForEntity(entity: GameEntity): GameEntity[] {
        if (entity instanceof Player) {
            return this.players;
        } else if (entity instanceof Invader) {
            return this.invaders;
        } else if (entity instanceof Wall) {
            return this.walls;
        } else if (entity instanceof Projectile) {
            return this.projectiles;
        } else if (entity instanceof GroundLine) {
            return this.groundLines;
        }
        throw new Error("Unknown entity type");
    }
}

