import { BaseEntity } from "../entities/game/BaseEntity";
import { Invader } from "../entities/game/invader/Invader";
import { InvaderService } from "../entities/game/invader/InvaderService";
import { PlayerService } from "../entities/game/player/PlayerService";
import { Projectile } from "../entities/game/projectile/Projectile";
import { ProjectileService } from "../entities/game/projectile/ProjectileService";

export class CollisionService {
    constructor(private projectileService: ProjectileService, private invaderService: InvaderService, private playerService: PlayerService) {}

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
    }

    private areColliding(entityA: BaseEntity, entityB: BaseEntity): boolean {
        // Implémentation de la vérification des collisions basée sur les rectangles englobants
        return !(
            entityA.fabricObject.left + entityA.fabricObject.width < entityB.fabricObject.left ||
            entityB.fabricObject.left + entityB.fabricObject.width < entityA.fabricObject.left ||
            entityA.fabricObject.top + entityA.fabricObject.height < entityB.fabricObject.top ||
            entityB.fabricObject.top + entityB.fabricObject.height < entityA.fabricObject.top
        );
    }

    private async handleProjectileInvaderCollision(projectile: Projectile, invader: Invader) {
        this.projectileService.removeProjectile(projectile.id);
        this.invaderService.removeInvader(invader.id);
        await this.playerService.increaseScore(invader.score); 
    }
}
