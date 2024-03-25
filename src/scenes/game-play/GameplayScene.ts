import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { Player } from "../../entities/player/Player";
import { Invader } from "../../entities/invader/Invader";
import { Wall } from "../../entities/wall/Wall";
import { Projectile } from "../../entities/projectile/Projectile";

export class GamePlayScene implements IScene {
    private player: Player;
    private invaders: Invader[] = [];
    private walls: Wall[] = [];
    private projectiles: Projectile[] = [];
    
    async initialize(): Promise<void> {
        // Initialisation des entités
        this.player = new Player();
        // TODO: Initialiser les invaders, les murs, et les projectiles
        
        // Exemple d'initialisation d'un invader, à répéter pour créer plusieurs invaders
        // this.invaders.push(new Invader(InvaderType.Basic));
        // TODO: Positionnement initial des entités
    }

    update(deltaTime: number): void {
        // Mise à jour des entités
        this.player.update(deltaTime);
        this.invaders.forEach(invader => invader.update(deltaTime));
        this.walls.forEach(wall => wall.update(deltaTime));
        this.projectiles.forEach(projectile => projectile.update(deltaTime));

        // TODO: Gestion des collisions et autres logiques spécifiques de gameplay
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
        // Nettoyage de la scène si nécessaire
    }

    // Ajoutez ici les méthodes spécifiques à la scène de gameplay si nécessaire
}
