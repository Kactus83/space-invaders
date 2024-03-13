import { IGameScene } from '../../IGameScene';
import { SceneManager } from '../../SceneManager';
import { Renderer } from '../../../renderer/Renderer';
import { ThemeManager } from '../../../themes/ThemeManager';
import { UserInputType } from '../../../inputs/UserInputType';

export class GamePlayScene implements IGameScene {
    constructor(
        private sceneManager: SceneManager,
        private renderer: Renderer,
        private themeManager: ThemeManager
    ) {}

    public initialize(): void {
        // Initialisation de la scène de jeu
    }

    public handleInput(inputType: UserInputType): void {
        // Gestion des entrées dans la scène de jeu
    }

    public update(deltaTime: number): void {
        // Logique de mise à jour de la scène de jeu
    }

    public render(): void {
        // Rendu de la scène de jeu
    }

    public cleanup(): void {
        // Nettoyage des ressources de la scène de jeu
    }
}