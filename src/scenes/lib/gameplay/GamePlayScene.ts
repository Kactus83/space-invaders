import { IGameScene } from '../../IGameScene';
import { SceneManager } from '../../SceneManager';
import { Renderer } from '../../../renderer/Renderer';
import { ThemeManager } from '../../../themes/ThemeManager';
import { UserInputType } from '../../../inputs/UserInputType';
import { PlayerService } from '../../../entities/game/player/PlayerService';
import { InputManager } from '../../../inputs/InputManager';
import { ProjectileService } from '../../../entities/game/projectile/ProjectileService';
import { InvaderService } from '../../../entities/game/invader/InvaderService';
import { CollisionService } from '../../../collisions/CollisionService';
import { PlayerHUD } from '../../../entities/game/player/PlayerHUD';
import { EndGameService } from '../../../end-game/EndGameService';
import { SceneIds } from '../../types/SceneIds';
import { WallService } from '../../../entities/game/wall/WallService';

export class GamePlayScene implements IGameScene {
    isInitialized: boolean = false;
    private projectileService: ProjectileService;
    private invaderService: InvaderService;
    private playerService: PlayerService;
    private wallService: WallService;
    private collisionService: CollisionService;
    private playerHUD: PlayerHUD;
    private endGameService: EndGameService;

    constructor(
        private sceneManager: SceneManager,
        private renderer: Renderer,
        private themeManager: ThemeManager,
        private inputManager: InputManager
    ) {}

    public async initialize(): Promise<void> {
        this.projectileService = new ProjectileService(this.themeManager);
        this.invaderService = new InvaderService(this.themeManager);
        this.playerService = new PlayerService(this.inputManager, this.themeManager, this.projectileService);
        this.wallService = new WallService(this.themeManager);
        this.collisionService = new CollisionService(this.projectileService, this.invaderService, this.playerService, this.wallService);
        this.playerHUD = new PlayerHUD(this.playerService, 10, 10);
        this.endGameService = new EndGameService(
            this.invaderService,
            this.playerService,
            this.sceneManager
        );  
        this.wallService.initializeWallsForLevel("level1");
        await this.playerService.initializePlayer();
        await this.invaderService.initializeWave();   
        this.isInitialized = true;
    }

    public handleInput(inputType: UserInputType): void {
        // Cette méthode pourrait rester vide si l'InputManager est directement géré par les services
    }

    public update(deltaTime: number): void {
        if (!this.isInitialized) {
            console.error("GamePlayScene not initialized");
            return;
        }
        this.playerService.update(deltaTime);
        this.projectileService.update(deltaTime);
        this.invaderService.update(deltaTime);
        this.collisionService.checkCollisions();
        this.playerHUD.update();
        this.endGameService.checkGameStatus();
    }

    public render(): void {
        if (!this.isInitialized) {
            console.error("GamePlayScene not initialized");
            return;
        }
        this.renderer.clearCanvas();
        const playerObject = this.playerService.getFabricObject();
        const projectileObjects = this.projectileService.getFabricObjects();
        const invaderObjects = this.invaderService.getFabricObjects(); 
        const wallObjects = this.wallService.getFabricObjects();
        const playerHUDObjects = this.playerHUD.getFabricObjects();
        this.renderer.draw([...wallObjects, ...playerHUDObjects, ...invaderObjects, ...projectileObjects, playerObject]);
    }

    public cleanup(): void {
        // Nettoyage spécifique de la scène de jeu
        this.playerService.cleanup();
    }
}
