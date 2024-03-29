import { GameEngine } from "./core/engine/GameEngine";
import './styles/styles.css'; // Import the styles for webpack to bundle

document.addEventListener("DOMContentLoaded", async () => {
    const gameEngine = new GameEngine();
    await gameEngine.start(); 
});