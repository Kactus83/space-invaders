import { BaseEntity } from "../../entities/game/BaseEntity";
import { Invader } from "../../entities/game/invader/Invader";
import { InvaderService } from "../../entities/game/invader/InvaderService";
import { PlayerService } from "../../entities/game/player/PlayerService";
import { Projectile } from "../../entities/game/projectile/Projectile";
import { ProjectileService } from "../../entities/game/projectile/ProjectileService";
import { ProjectileOrigin } from "../../entities/game/projectile/Projectileorigin";
import { WallService } from "../../entities/game/wall/WallService";

export class CollisionService {
    constructor(private projectileService: ProjectileService, private invaderService: InvaderService, private playerService: PlayerService, private wallService: WallService) {}

    /**
     * Vérifie les collisions entre les projectiles, les invaders, les murs et le joueur.   
     * @returns Une promesse résolue une fois que les collisions ont été vérifiées. 
     * @async
     */
    public async checkCollisions(): Promise<void> {
        const projectiles = this.projectileService.getProjectiles();
        const player = this.playerService.getPlayer();
    
        // Gestion des collisions des projectiles avec les invaders et le joueur
        projectiles.forEach(async (projectile) => {
            // Vérification des collisions des projectiles du joueur avec les invaders
            if (projectile.origin === ProjectileOrigin.Player) {
                this.invaderService.getInvaders().forEach(async (invader) => {
                    if (this.areColliding(projectile, invader)) {
                        await this.handleProjectileInvaderCollision(projectile, invader);
                    }
                });
            }
    
            // Vérification des collisions des projectiles des invaders avec le joueur
            if (projectile.origin === ProjectileOrigin.Invader && this.areColliding(projectile, player)) {
                this.handleProjectilePlayerCollision(projectile);
            }
    
            // Vérification des collisions des projectiles avec les murs
            this.wallService.getWalls().forEach((wall) => {
                if (this.areColliding(projectile, wall)) {
                    this.wallService.applyDamageToWall(wall, projectile.damage);
                    this.projectileService.removeProjectile(projectile.id);
                }
            });
        });
    
        // Gestion des collisions des invaders avec les murs
        this.invaderService.getInvaders().forEach(invader => {
            this.wallService.getWalls().forEach(wall => {
                if (this.areColliding(invader, wall)) {
                    const invaderDestroyed = invader.applyDamage(wall.damage);
                    const wallDestroyed = this.wallService.applyDamageToWall(wall, invader.damage);
    
                    if (invaderDestroyed) {
                        this.invaderService.removeInvader(invader.id);
                    }
    
                    if (wallDestroyed) {
                        // La logique de suppression est gérée dans applyDamageToWall
                    }
                }
            });
        });
    }    

    /**
     * Vérifie si deux entités sont en collision.
     * @param entityA Première entité
     * @param entityB Deuxième entité
     * @returns true si les entités sont en collision, sinon false
     */
    private areColliding(entityA: BaseEntity, entityB: BaseEntity): boolean {
        if (!entityA.fabricObject || !entityB.fabricObject) {
            console.error("One of the entities is not initialized.");
            return false;
        }
        return !(
            entityA.fabricObject.left + entityA.fabricObject.width < entityB.fabricObject.left ||
            entityB.fabricObject.left + entityB.fabricObject.width < entityA.fabricObject.left ||
            entityA.fabricObject.top + entityA.fabricObject.height < entityB.fabricObject.top ||
            entityB.fabricObject.top + entityB.fabricObject.height < entityA.fabricObject.top
        );
    }

    /**
     * Gère la collision entre un projectile et un invader.
     * @param projectile 
     * @param invader 
     */
    private async handleProjectileInvaderCollision(projectile: Projectile, invader: Invader) {
        const isDestroyed = invader.applyDamage(projectile.damage);
        this.projectileService.removeProjectile(projectile.id);
        if (isDestroyed) {
            console.log("Invader destroyed.");
            this.invaderService.removeInvader(invader.id);
            await this.playerService.increaseScore(invader.score);
        } else {
            console.log("Invader hit but not destroyed.");
        }
    }

    /**
     * Gère la collision entre un projectile et le joueur.
     * @param projectile 
     */
    private async handleProjectilePlayerCollision(projectile: Projectile) {
        this.playerService.applyDamage(projectile.damage);
        this.projectileService.removeProjectile(projectile.id);
    }
}
