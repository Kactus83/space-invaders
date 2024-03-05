import { GameEngine } from './core/GameEngine';
import './styles/style.css';

console.log('Hello, TypeScript!');
let isInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    if (isInitialized) return;
    console.log('DOM is ready');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (ctx) {
        const gameEngine = new GameEngine(ctx);
        gameEngine.start();
    }

    isInitialized = true;
});
