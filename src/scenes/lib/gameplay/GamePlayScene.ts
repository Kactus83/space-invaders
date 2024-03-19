import { IGameScene } from '../../IGameScene';
import { SceneManager } from '../../SceneManager';
import { Renderer } from '../../../game-services/renderer/Renderer';
import { ThemeManager } from '../../../themes/ThemeManager';
import { UserInputType } from '../../../game-services/inputs/UserInputType';
import { PlayerService } from '../../../entities/game/player/PlayerService';
import { InputManager } from '../../../game-services/inputs/InputManager';
import { ProjectileService } from '../../../entities/game/projectile/ProjectileService';
import { InvaderService } from '../../../entities/game/invader/InvaderService';
import { CollisionService } from '../../../game-services/collisions/CollisionService';
import { PlayerHUD } from '../../../entities/game/player/PlayerHUD';
import { EndGameService } from '../../../game-services/end-game/EndGameService';
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
        await this.wallService.initializeWallsForLevel("level1");
        await this.playerService.initializePlayer();
        await this.invaderService.initializeWave("wave1");   
        setTimeout(() => {
            this.isInitialized = true;
        }, 250);
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
        this.renderer.draw([...wallObjects, ...invaderObjects, ...projectileObjects, ...playerHUDObjects, playerObject]);
    }

    public cleanup(): void {
        // Nettoyage spécifique de la scène de jeu
        this.playerService.cleanup();
    }
}
