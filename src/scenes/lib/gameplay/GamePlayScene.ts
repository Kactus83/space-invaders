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
import { WallService } from '../../../entities/game/wall/WallService';
import { WaveManagementService } from '../../../game-services/wave-management/WaveManagementService';

export class GamePlayScene implements IGameScene {
    isInitialized: boolean = false;
    isUpdating: boolean = false;
    private projectileService: ProjectileService;
    private invaderService: InvaderService;
    private playerService: PlayerService;
    private wallService: WallService;
    private collisionService: CollisionService;
    private playerHUD: PlayerHUD;
    private waveManagementService: WaveManagementService;

    constructor(
        private sceneManager: SceneManager,
        private renderer: Renderer,
        private themeManager: ThemeManager,
        private inputManager: InputManager
    ) {}

    public async initialize(): Promise<void> {
        this.projectileService = new ProjectileService(this.themeManager);
        this.invaderService = new InvaderService(this.themeManager, this.projectileService);
        this.playerService = new PlayerService(this.inputManager, this.themeManager, this.projectileService);
        this.wallService = new WallService(this.themeManager);
        this.collisionService = new CollisionService(this.projectileService, this.invaderService, this.playerService, this.wallService);
        this.playerHUD = new PlayerHUD(this.playerService, 10, 10);
        this.waveManagementService = new WaveManagementService(this.invaderService, this.wallService, this.playerService, this.sceneManager);
        await this.playerService.initializePlayer();
        await this.waveManagementService.initializeWave().then(() => {
            console.log("GamePlayScene initialized", this.waveManagementService.isInitialized);
            this.isInitialized = this.waveManagementService.isInitialized;
        });
    }

    public handleInput(inputType: UserInputType): void {
        // Cette méthode pourrait rester vide si l'InputManager est directement géré par les services
    }

    public async update(deltaTime: number): Promise<void> {
        this.isUpdating = true;
        if (!this.isInitialized || !this.waveManagementService.isInitialized) {
            console.error("Update error : GamePlayScene not initialized");
            this.isUpdating = false;
            return;
        }
        this.playerService.update(deltaTime);
        this.projectileService.update(deltaTime);
        this.invaderService.update(deltaTime);
        this.collisionService.checkCollisions();
        this.playerHUD.update();
        await this.waveManagementService.checkGameStatus();
        this.isUpdating = false;
    }

    public render(): void {
        if (!this.isInitialized || !this.waveManagementService.isInitialized) {
            console.error("render error : GamePlayScene not initialized");
            return;
        }
        if (this.isUpdating) {
            console.error("render error : GamePlayScene is updating");
            return;
        }
        // Assurez-vous que tous les objets sont prêts avant de les dessiner
        const objectsToDraw = [
            ...this.wallService.getFabricObjects(),
            ...this.invaderService.getFabricObjects(),
            ...this.projectileService.getFabricObjects(),
            this.playerService.getFabricObject(),
            ...this.playerHUD.getFabricObjects()
        ];
    
        this.renderer.clearCanvas();
        this.renderer.draw(objectsToDraw);
    }
    

    public cleanup(): void {
        // Nettoyage spécifique de la scène de jeu
        this.playerService.cleanup();
        this.invaderService.cleanup();
        this.projectileService.cleanup();
        this.wallService.cleanup();
    }
}
