import { GameEntity } from "../../entities/GameEntity";
import { GameBonus } from "../../entities/bonus/GameBonus";
import { GroundLine } from "../../entities/ground-line/GroundLine";
import { Invader } from "../../entities/invader/Invader";
import { SkillsIds } from "../../entities/models/skill-system/types/SkillsIds";
import { Player } from "../../entities/player/Player";
import { Projectile } from "../../entities/projectile/Projectile";
import { EntityState } from "../../entities/types/EntityState";
import { Wall } from "../../entities/wall/Wall";
import { ICollidable } from "./ICollidable";

export class CollisionService {
    private players: Player[] = [];
    private invaders: Invader[] = [];
    private walls: Wall[] = [];
    private projectiles: Projectile[] = [];
    private groundLines: GroundLine[] = [];
    private gameBonus: GameBonus[] = [];

    /**
     * Register an entity to the collision service
     * @param entity 
     */
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
        } else if (entity instanceof GameBonus) {
            this.gameBonus.push(entity);
        }
    }
    /**
     * Unregister an entity from the collision service
     * @param entity 
     */
    public unregisterEntity(entity: GameEntity): void {
        let array = this.getArrayForEntity(entity);
        const index = array.indexOf(entity);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    /**
     * Check collisions between entities
     */
    public checkCollisions(): void {
        // Vérifications des collisions pour les projectiles
        this.projectiles.forEach(projectile => {
            // Collisions entre Projectiles
            this.projectiles.forEach(other_Projectile => {
                if(projectile === other_Projectile || projectile.state !== EntityState.ToBeRemoved || other_Projectile.state !== EntityState.ToBeRemoved) {
                    return;
                }
                if (this.areColliding(projectile, other_Projectile)) {
                    projectile.onCollisionWith(other_Projectile);
                    other_Projectile.onCollisionWith(projectile);
                }
            });

            // Collisions Projectile avec Invaders
            this.invaders.forEach(invader => {
                if (this.areColliding(projectile, invader) && projectile.state !== EntityState.ToBeRemoved) {
                    projectile.onCollisionWith(invader);
                    invader.onCollisionWith(projectile);
                }
            });
    
            // Collision Projectile avec Player
            this.players.forEach(player => {
                if (this.areColliding(projectile, player) && projectile.state !== EntityState.ToBeRemoved) {
                    if(player.skillSystem.isSkillActive(SkillsIds.Semi_ReflectiveShield) && Math.random() <= 0.3) {
                        projectile.origin = player;
                    }else{
                        projectile.onCollisionWith(player);
                        player.onCollisionWith(projectile);
                    }
                }
            });

            if (projectile.isInCollisionZone() && projectile.state !== EntityState.ToBeRemoved) {
                this.walls.forEach(wall => {
                    if (this.areColliding(projectile, wall)) {
                        projectile.onCollisionWith(wall);
                        wall.onCollisionWith(projectile);
                    }
                });
            }
    
            // Collision Projectile avec GroundLine
            if (projectile.isInCollisionZone() && projectile.state !== EntityState.ToBeRemoved) {
                this.groundLines.forEach(groundLine => {
                    if (this.areColliding(projectile, groundLine)) {
                        projectile.onCollisionWith(groundLine);
                        groundLine.onCollisionWith(projectile);
                    }
                });
            }
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
            if (invader.isInCollisionZone()) {
                this.walls.forEach(wall => {
                    if (this.areColliding(invader, wall)) {
                        invader.onCollisionWith(wall);
                        wall.onCollisionWith(invader);
                    }
                });
            }
    
            // Collision Invader avec GroundLine
            if (invader.isInCollisionZone()) {
                this.groundLines.forEach(groundLine => {
                    if (this.areColliding(invader, groundLine)) {
                        invader.onCollisionWith(groundLine);
                        groundLine.onCollisionWith(invader);
                    }
                });
            }
        });

        // Vérifications des collisions pour les bonus
        this.gameBonus.forEach(bonus => {
            // Collision Bonus avec Player
            this.players.forEach(player => {
                if (this.areColliding(bonus, player)) {
                    bonus.onCollisionWith(player);
                    player.onCollisionWith(bonus);
                }
            });

            // Collision Bonus avec Projectiles
            this.projectiles.forEach(projectile => {
                if (this.areColliding(bonus, projectile)) {
                    bonus.onCollisionWith(projectile);
                    projectile.onCollisionWith(bonus);
                }
            });
    
            // Collision Bonus avec GroundLine
            if (bonus.isInCollisionZone()) {
                this.groundLines.forEach(groundLine => {
                    if (this.areColliding(bonus, groundLine)) {
                        bonus.onCollisionWith(groundLine);
                        groundLine.onCollisionWith(bonus);
                    }
                });
            }
        });
    }    

    /**
     * Check if two entities are colliding
     * @param entityA 
     * @param entityB 
     * @returns 
     */
    private areColliding(entityA: ICollidable, entityB: ICollidable): boolean {
        const boundsA = entityA.getCollisionBounds();
        const boundsB = entityB.getCollisionBounds();

        return !(boundsA.x + boundsA.width < boundsB.x ||
                 boundsB.x + boundsB.width < boundsA.x ||
                 boundsA.y + boundsA.height < boundsB.y ||
                 boundsB.y + boundsB.height < boundsA.y);
    }

    /**
     * Get the array of entities for a given entity type
     * @param entity 
     * @returns 
     */
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
        }else if (entity instanceof GameBonus) {
            return this.gameBonus;
        }
        throw new Error("Unknown entity type");
    }
     
    /**
     * Reset the collision service
     */
    public reset(): void {
        this.players = [];
        this.invaders = [];
        this.walls = [];
        this.projectiles = [];
        this.groundLines = [];
        this.gameBonus = [];
    }
    
}

