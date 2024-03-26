import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { Player } from "../../entities/player/Player";
import { Invader } from "../../entities/invader/Invader";
import { Wall } from "../../entities/wall/Wall";
import { Projectile } from "../../entities/projectile/Projectile";
import { InvaderWaveService } from "../../game-services/invader-wave/InvaderWaveService";
import { CollisionService } from "../../game-services/collision/CollisionService";
import { EntityState } from "../../entities/types/EntityState";

export class GamePlayScene implements IScene {
    private invaderWaveService: InvaderWaveService = new InvaderWaveService();;
    private collisionService: CollisionService = new CollisionService();
    private player: Player;
    private invaders: Invader[] = [];
    private walls: Wall[] = [];
    private projectiles: Projectile[] = [];
    
    async initialize(): Promise<void> {
        // Initialisation des entités
        await this.invaderWaveService.prepareWaves();
         
        this.player = new Player();
        await this.player.init();
        this.collisionService.registerEntity(this.player);
    }

    update(deltaTime: number): void {
        // Mise à jour des services
        this.invaderWaveService.update(deltaTime);
    
        // Récupération et ajout des nouveaux invaders
        this.invaderWaveService.update(deltaTime);

        const newInvaders = this.invaderWaveService.getPendingInvaders();
        newInvaders.forEach(invader => {
            this.invaders.push(invader);
            this.collisionService.registerEntity(invader);
        });

        // Récupérer les projectiles du joueur
        const playerProjectiles = this.player.getNewProjectiles();
        playerProjectiles.forEach(projectile => {
            this.projectiles.push(projectile);
            this.collisionService.registerEntity(projectile);
        });

        // Récupérer les projectiles des invaders
        this.invaders.forEach(invader => {
            const invaderProjectiles = invader.getNewProjectiles();
            invaderProjectiles.forEach(projectile => {
                this.projectiles.push(projectile);
                this.collisionService.registerEntity(projectile);
            });
        });
    
        // Mise à jour des entités existantes...
        this.player.update(deltaTime);
        this.invaders.forEach(invader => invader.update(deltaTime));
        this.walls.forEach(wall => wall.update(deltaTime));
        this.projectiles.forEach(projectile => projectile.update(deltaTime));
    
        // Vérification des collisions
        this.collisionService.checkCollisions();

        // Cleanup des entités
        this.cleanupEntities();
    }
    

    getDrawableObjects(): IRenderable[] {
        // Renvoie toutes les entités à dessiner
        return [
            this.player,
            ...this.invaders,
            ...this.walls,
            ...this.projectiles
        ];
    }

    cleanup(): void {
        this.player.cleanup();
        // Nettoyage de la scène si nécessaire
    }

    private cleanupEntities() {
        this.invaders = this.invaders.filter(invader => invader.state !== EntityState.ToBeRemoved);
        this.projectiles = this.projectiles.filter(projectile => projectile.state !== EntityState.ToBeRemoved);
        // Appliquez le même principe aux murs et à d'autres entités si nécessaire
    }

    // Ajoutez ici les méthodes spécifiques à la scène de gameplay si nécessaire
}
