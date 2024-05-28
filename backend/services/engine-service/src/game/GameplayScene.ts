import { Player } from "./entities/player/Player";
import { Invader } from "./entities/invader/Invader";
import { Wall } from "./entities/wall/Wall";
import { Projectile } from "./entities/projectile/Projectile";
import { InvaderWaveService } from "./services/invader-wave/InvaderWaveService";
import { CollisionService } from "./services/collision/CollisionService";
import { EntityState } from "./entities/types/EntityState";
import { GroundLine } from "./entities/ground-line/GroundLine";
import { HUD } from "./ui/HUD/HUD";
import { WallService } from "./services/walls/WallService";
import { GameBonus } from "./entities/bonus/GameBonus";
import { MessageDisplay } from "./ui/message-display/MessageDisplay";
import { GameEntity } from "./entities/GameEntity";
import { GameStatusService } from "./services/game-status/GameStatusService";

export class GamePlayScene {
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

        // Récupérer les projectiles
        this.collectAndRegisterProjectiles();
    
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

    collectAndRegisterProjectiles() {
        // Collecte et enregistrement des projectiles en une seule étape
        const newProjectiles = [...this.player.getNewProjectiles(), ...this.invaders.flatMap(invader => invader.getNewProjectiles())];
        newProjectiles.forEach(projectile => {
            this.projectiles.push(projectile);
            this.collisionService.registerEntity(projectile);
        });
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
        this.invaders = this.cleanupEntityType(this.invaders);
        this.walls = this.cleanupEntityType(this.walls);
        this.projectiles = this.cleanupEntityType(this.projectiles);
        this.gameBonus = this.cleanupEntityType(this.gameBonus);
    }
    
    private cleanupEntityType<T extends GameEntity>(entitiesArray: T[]): T[] {
        const entitiesToKeep = entitiesArray.filter(entity => {
            if(entity instanceof Invader) {
                const bonus = entity.getGameBonus();
                if(bonus) {
                    console.log("Bonus created");
                    this.gameBonus.push(bonus);
                    this.collisionService.registerEntity(bonus);
                }
            }
            const shouldKeep = entity.state !== EntityState.ToBeRemoved;
            if (!shouldKeep) {
                this.collisionService.unregisterEntity(entity);
            }
            return shouldKeep;
        });
        return entitiesToKeep;
    }
    
}
