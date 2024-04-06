import { GameEngine } from "./core/engine/GameEngine";
import './styles/styles.css'; // Import the styles for webpack to bundle


/**
 * When the DOM content is loaded, create a new GameEngine instance and start the game
 */
document.addEventListener("DOMContentLoaded", async () => {
    const gameEngine = new GameEngine();
    await gameEngine.start(); 
});