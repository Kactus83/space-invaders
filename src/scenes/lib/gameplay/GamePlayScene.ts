import { IGameScene } from '../../IGameScene';
import { SceneManager } from '../../SceneManager';
import { Renderer } from '../../../renderer/Renderer';
import { ThemeManager } from '../../../themes/ThemeManager';
import { UserInputType } from '../../../inputs/UserInputType';
import { PlayerService } from '../../../entities/game/player/PlayerService';
import { InputManager } from '../../../inputs/InputManager';

export class GamePlayScene implements IGameScene {
    isInitialized: boolean = false;
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
        this.playerService = new PlayerService(this.inputManager, this.themeManager, playerStartPositionX, playerStartPositionY);
        await this.playerService.initializePlayer();
        this.isInitialized = true;
    }

    public handleInput(inputType: UserInputType): void {
        // Cette méthode pourrait rester vide si l'InputManager est directement géré par les services
    }

    public update(deltaTime: number): void {
        this.playerService.update(deltaTime);
    }

    public render(): void {
        if(!this.isInitialized) {
            console.error("GamePlayScene not initialized");
            return;
        }
        this.renderer.clearCanvas();
        const playerObject = this.playerService.getFabricObject();
        this.renderer.draw([playerObject]);
        // Ajoutez ici le rendu d'autres entités si nécessaire
    }

    public cleanup(): void {
        // Nettoyage spécifique de la scène de jeu
        this.playerService.cleanup();
    }
}
