import { GameEngine } from './core/GameEngine';
import { ThemeManager } from './themes/ThemeManager';
import { fabric } from 'fabric';
import './styles/styles.css';

class App {
    private canvas: fabric.Canvas;
    private gameEngine: GameEngine;

    constructor() {
        this.initializeCanvas();
        this.initializeGame();
    }

    private initializeCanvas(): void {
        // Configuration initiale du canvas Fabric
        this.canvas = new fabric.Canvas('gameCanvas', {
            hoverCursor: 'pointer',
            selection: false,
            width: 800,
            height: 600,
        });
    }

    private initializeGame(): void {
        // Création et configuration des managers nécessaires
        const themeManager = new ThemeManager();
        this.gameEngine = new GameEngine(this.canvas, themeManager);

        // Démarrage du jeu
        this.gameEngine.start();
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
