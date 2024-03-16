import { IGameScene } from '../../IGameScene';
import { SceneManager } from '../../SceneManager';
import { Renderer } from '../../../renderer/Renderer';
import { ThemeManager } from '../../../themes/ThemeManager';
import { UserInputType } from '../../../inputs/UserInputType';
import { PlayerService } from '../../../entities/game/player/PlayerService';
import { InputManager } from '../../../inputs/InputManager';
import { ProjectileService } from '../../../entities/game/projectile/ProjectileService';
import { InvaderService } from '../../../entities/game/invader/InvaderService';

export class GamePlayScene implements IGameScene {
    isInitialized: boolean = false;
    private projectileService: ProjectileService;
    private invaderService: InvaderService;
    private playerService: PlayerService;

    constructor(
        private sceneManager: SceneManager,
        private renderer: Renderer,
        private themeManager: ThemeManager,
        private inputManager: InputManager
    ) {}

    public async initialize(): Promise<void> {
        // Position initiale du joueur (à ajuster selon les besoins)
        const playerStartPositionX = 300;
        const playerStartPositionY = 560;
        this.projectileService = new ProjectileService(this.themeManager);
        this.invaderService = new InvaderService(this.themeManager);
        this.playerService = new PlayerService(this.inputManager, this.themeManager, playerStartPositionX, playerStartPositionY, this.projectileService);
        await this.playerService.initializePlayer();
        await this.invaderService.initializeWave();
        this.isInitialized = true;
    }

    public handleInput(inputType: UserInputType): void {
        // Cette méthode pourrait rester vide si l'InputManager est directement géré par les services
    }

    public update(deltaTime: number): void {
        this.playerService.update(deltaTime);
        this.projectileService.update(deltaTime);
        this.invaderService.update(deltaTime);
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
        this.renderer.draw([...invaderObjects, ...projectileObjects, playerObject]);
    }

    public cleanup(): void {
        // Nettoyage spécifique de la scène de jeu
        this.playerService.cleanup();
    }
}
