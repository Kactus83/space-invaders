import { IGameScene } from '../../IGameScene';
import { SceneManager } from '../../SceneManager';
import { Renderer } from '../../../game-services/renderer/Renderer';
import { ThemeManager } from '../../../themes/ThemeManager';
import { SceneIds } from '../../types/SceneIds';
import { fabric } from 'fabric';
import { config } from '../../../config/config';

export class GameLoseScene implements IGameScene {
    isInitialized: boolean = false;
    private loseText: fabric.Text;

    constructor(
        private sceneManager: SceneManager,
        private renderer: Renderer,
        private themeManager: ThemeManager
    ) {}

    public async initialize(): Promise<void> {
        this.loseText = new fabric.Text('Défaite...', {
            left: config.canvas.width / 2,
            top: config.canvas.height / 2,
            fontSize: 40,
            originX: 'center',
            originY: 'center',
            fill: '#FF0000'
        });

        setTimeout(async () => {
            await this.sceneManager.changeScene(SceneIds.MainMenu);
        }, 10000);

        this.isInitialized = true;
    }

    public handleInput(): void {}

    public update(): void {}

    public render(): void {
        this.renderer.clearCanvas();
        this.renderer.draw([this.loseText]);
    }

    public cleanup(): void {
        this.renderer.clearCanvas();
    }
}
