import { IGameScene } from '../../IGameScene';
import { SceneManager } from '../../SceneManager';
import { Renderer } from '../../../game-services/renderer/Renderer';
import { ThemeManager } from '../../../themes/ThemeManager';
import { SceneIds } from '../../types/SceneIds';
import { UserInputType } from '../../../game-services/inputs/UserInputType';
import { MenuButton } from '../../../entities/ui/MenuButton';

export class MainMenuScene implements IGameScene {
    isInitialized: boolean = false;
    private buttons: MenuButton[] = [];
    private objectsToRender: fabric.Object[] = [];

    constructor(
        private sceneManager: SceneManager,
        private renderer: Renderer,
        private themeManager: ThemeManager
    ) {}

    public async initialize(): Promise<void> {
        let startGameButton = new MenuButton('Start Game', 300, 200, async () => {
            await this.sceneManager.changeScene(SceneIds.GamePlay);
        });        

        let optionsButton = new MenuButton('Options', 300, 260, () => {
            console.log('Options clicked');
            // Implementer le changement vers une scène d'options ici
        });

        let quitButton = new MenuButton('Quit', 300, 320, () => {
            console.log('Quit clicked');
        });

        this.buttons = [startGameButton, optionsButton, quitButton];
        this.objectsToRender = this.buttons.map(button => button.object);

        this.isInitialized = true;
        // Pas besoin d'appeler le renderer ici, car render() le fera à chaque frame
    }

    public cleanup(): void {
        this.renderer.clearCanvas();
        this.buttons = [];
        this.objectsToRender = [];
    }

    public handleInput(inputType: UserInputType): void {
        // Traitement des entrées utilisateur spécifiques à cette scène
    }

    public update(deltaTime: number): void {
        // Mise à jour de la logique de la scène
    }

    public render(): void {
        this.renderer.clearCanvas();
        this.renderer.draw(this.objectsToRender);
    }
}
