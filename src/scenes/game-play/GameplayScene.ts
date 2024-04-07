import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { Player } from "../../entities/player/Player";
import { Invader } from "../../entities/invader/Invader";
import { Wall } from "../../entities/wall/Wall";
import { Projectile } from "../../entities/projectile/Projectile";
import { InvaderWaveService } from "../../game-services/invader-wave/InvaderWaveService";
import { CollisionService } from "../../game-services/collision/CollisionService";
import { EntityState } from "../../entities/types/EntityState";
import { GroundLine } from "../../entities/ground-line/GroundLine";
import { HUD } from "../../ui/HUD/HUD";
import { WallService } from "../../game-services/walls/WallService";
import { GameStatusService } from "../../game-services/game-status/GameStatusService";
import { GameBonus } from "../../entities/bonus/GameBonus";
import { MessageDisplay } from "../../ui/message-display/MessageDisplay";

export class GamePlayScene implements IScene {
    private isSceneInit: boolean = false;
    public allInvadersDead: boolean = false;
    private gameStatusService: GameStatusService;
    private invaderWaveService: InvaderWaveService = new InvaderWaveService();
    private wallService: WallService;
    private collisionService: CollisionService = new CollisionService();
    private player: Player;
    private groundLine: GroundLine;
    private invaders: Invader[] = [];
    private walls: Wall[] = [];
    private projectiles: Projectile[] = [];
    private gameBonus: GameBonus[] = [];
    private hud: HUD;
    private loadingMessageDisplay: MessageDisplay = new MessageDisplay("LOADING...");
    
    async initialize(): Promise<void> {
        
        this.groundLine = new GroundLine();
        await this.groundLine.init();
        this.collisionService.registerEntity(this.groundLine);

        this.player = new Player();
        await this.player.init();
        this.collisionService.registerEntity(this.player);
        
        this.wallService = new WallService();
        await this.wallService.initialize();  
        // Récupération et mise à jour des murs
        const newWalls = this.wallService.getWallsAndClear();
        if (newWalls.length > 0) {
            // Désenregistrer les anciens murs de la détection des collisions
            this.walls.forEach(wall => this.collisionService.unregisterEntity(wall));

            // Mise à jour de la liste des murs dans la scène
            this.walls = newWalls;

            // Enregistrer les nouveaux murs pour la détection des collisions
            this.walls.forEach(wall => this.collisionService.registerEntity(wall));
        }
        
        this.hud = new HUD(this.player, this.groundLine);

        this.gameStatusService = new GameStatusService(
            this.player,
            this.invaderWaveService,
            this,
            this.groundLine
        );

        this.invaderWaveService.init();
        const waveName: string = this.invaderWaveService.getWaveSetType();
        this.loadingMessageDisplay = new MessageDisplay(waveName);
        

        setTimeout(() => {
            this.isSceneInit = true;
            console.log("Gameplay scene initialized");
        }, 2000);
    }

    update(deltaTime: number): void {

        // Vérifier si la scène est initialisée
        if(!this.isSceneInit) {
            return;
        }
         
        this.wallService.update(deltaTime);

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
        this.gameBonus.forEach(bonus => bonus.update(deltaTime));
        this.player.update(deltaTime);
        this.groundLine.update(deltaTime);
        this.invaders.forEach(invader => invader.update(deltaTime));
        this.walls.forEach(wall => wall.update(deltaTime));
        this.projectiles.forEach(projectile => projectile.update(deltaTime));
    
        // Vérification des collisions
        this.collisionService.checkCollisions();

        // Actualisation de l'affichage HUD
        this.hud.updateHUD();

        // Cleanup des entités
        this.cleanupEntities();

        if(this.invaders.length === 0 && this.invaderWaveService.allWavesCompleted) {
            this.allInvadersDead = true;
        }

        // Check game status
        this.gameStatusService.update();
    }
    

    getDrawableObjects(): IRenderable[] {
        
        // Vérifier si la scène est initialisée
        if(!this.isSceneInit) {
            return [this.loadingMessageDisplay];
        }

        // Renvoie toutes les entités à dessiner
        return [
            this.player,
            this.groundLine,
            ...this.walls,
            ...this.invaders,
            ...this.projectiles,
            ...this.gameBonus,
            this.hud
        ];
    }

    cleanup(): void {
        // Désenregistrer toutes les entités du service de collision
        this.collisionService.unregisterEntity(this.player);
        this.walls.forEach(wall => this.collisionService.unregisterEntity(wall));
        this.invaders.forEach(invader => this.collisionService.unregisterEntity(invader));
        this.projectiles.forEach(projectile => this.collisionService.unregisterEntity(projectile));
        this.gameBonus.forEach(bonus => this.collisionService.unregisterEntity(bonus));
    
        // Réinitialiser les listes et les états
        this.invaders = [];
        this.walls = [];
        this.projectiles = [];
        this.gameBonus = [];
        this.allInvadersDead = false;

        // clean up
        this.player.cleanup();
        this.hud.cleanup();
        this.collisionService.reset();
        this.invaderWaveService.reset();
    
        this.isSceneInit = false;
    }
    

    private cleanupEntities() {
        // Filtre les invaders qui doivent être supprimés et les désenregistre de la détection de collision
        this.invaders = this.invaders.filter(invader => {
            if (invader.state === EntityState.ToBeRemoved) {
                const bonus = invader.getGameBonus();
                if(bonus) {
                    console.log("Bonus created");
                    this.gameBonus.push(bonus);
                    this.collisionService.registerEntity(bonus);
                }
                this.collisionService.unregisterEntity(invader);
                return false;
            }
            return true;
        });

        // Applique le même principe aux murs
        this.walls = this.walls.filter(wall => {
            if (wall.state === EntityState.ToBeRemoved) {
                this.collisionService.unregisterEntity(wall);
                return false;
            }
            return true;
        });

        // Applique le même principe aux projectiles
        this.projectiles = this.projectiles.filter(projectile => {
            if (projectile.state === EntityState.ToBeRemoved) {
                this.collisionService.unregisterEntity(projectile);
                return false;
            }
            return true;
        });

        // Applique le même principe aux bonus
        this.gameBonus = this.gameBonus.filter(bonus => {
            if (bonus.state === EntityState.ToBeRemoved) {
                this.collisionService.unregisterEntity(bonus);
                return false;
            }
            return true;
        });
    }
}
