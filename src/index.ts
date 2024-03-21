import { GameEngine } from "./core/engine/GameEngine";
import './styles/styles.css'; // Import the styles for webpack to bundle

document.addEventListener("DOMContentLoaded", () => {
    const gameEngine = new GameEngine();
    gameEngine.start();
});