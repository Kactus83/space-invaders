import { BaseEntity } from "../entities/game/BaseEntity";
import { Invader } from "../entities/game/invader/Invader";
import { InvaderService } from "../entities/game/invader/InvaderService";
import { PlayerService } from "../entities/game/player/PlayerService";
import { Projectile } from "../entities/game/projectile/Projectile";
import { ProjectileService } from "../entities/game/projectile/ProjectileService";
import { WallService } from "../entities/game/wall/WallService";

export class CollisionService {
    constructor(private projectileService: ProjectileService, private invaderService: InvaderService, private playerService: PlayerService, private wallService: WallService) {}

    public async checkCollisions(): Promise<void> {
        const projectiles = this.projectileService.getProjectiles();
        const invaders = this.invaderService.getInvaders();

        for (const projectile of projectiles) {
            for (const invader of invaders) {
                if (this.areColliding(projectile, invader)) {
                    await this.handleProjectileInvaderCollision(projectile, invader);
                }
            }
        }
        
        // Nouvelle boucle pour vérifier les collisions entre les projectiles et les murs
        const walls = this.wallService.getWalls(); 
        for (const projectile of this.projectileService.getProjectiles()) {
            for (const wall of walls) {
                if (this.areColliding(projectile, wall)) {
                    this.wallService.applyDamageToWall(wall, projectile.damage);
                    this.projectileService.removeProjectile(projectile.id);
                    break; 
                }
            }
        }

        this.invaderService.getInvaders().forEach(invader => {
            walls.forEach(wall => {
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

    private areColliding(entityA: BaseEntity, entityB: BaseEntity): boolean {
        return !(
            entityA.fabricObject.left + entityA.fabricObject.width < entityB.fabricObject.left ||
            entityB.fabricObject.left + entityB.fabricObject.width < entityA.fabricObject.left ||
            entityA.fabricObject.top + entityA.fabricObject.height < entityB.fabricObject.top ||
            entityB.fabricObject.top + entityB.fabricObject.height < entityA.fabricObject.top
        );
    }

    private async handleProjectileInvaderCollision(projectile: Projectile, invader: Invader) {
        // Applique les dégâts du projectile à l'invader
        const isDestroyed = invader.applyDamage(projectile.damage);
    
        // Retire le projectile dans tous les cas
        this.projectileService.removeProjectile(projectile.id);
    
        // Si l'invader est détruit, le retirer et augmenter le score du joueur
        if (isDestroyed) {
            this.invaderService.removeInvader(invader.id);
            await this.playerService.increaseScore(invader.score);
        }
    }
    
}
