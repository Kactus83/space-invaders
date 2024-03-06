import { GameEngine } from './core/GameEngine';
import './styles/style.css';

let isInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    if (isInitialized) return;

    // Création du canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas'; // Assigner un ID pour des références éventuelles
    canvas.width = 800;
    canvas.height = 600;

    // Création du conteneur d'interface utilisateur
    const gameUI = document.createElement('div');
    gameUI.id = 'gameUI';
    
    // Création et ajout de l'affichage du score
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'scoreDisplay';
    scoreDisplay.textContent = 'Score: 0'; // Initialisation du texte
    gameUI.appendChild(scoreDisplay);

    // Création et ajout de l'affichage du niveau
    const levelDisplay = document.createElement('div');
    levelDisplay.id = 'levelDisplay';
    levelDisplay.textContent = 'Level: 1'; // Initialisation du texte
    gameUI.appendChild(levelDisplay);

    // Ajout du conteneur UI et du canvas au corps du document
    document.body.appendChild(gameUI);
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (ctx) {
        const gameEngine = new GameEngine(ctx);
        gameEngine.start();
    }

    isInitialized = true;
});
