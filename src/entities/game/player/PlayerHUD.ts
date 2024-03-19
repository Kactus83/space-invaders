import { fabric } from 'fabric';
import { PlayerService } from './PlayerService';

export class PlayerHUD {
    private scoreText: fabric.Text;
    private levelText: fabric.Text;
    private healthText: fabric.Text; // Ajout pour les points de vie
    private shieldText: fabric.Text; // Ajout pour le bouclier

    constructor(private playerService: PlayerService, x: number, y: number) {
        this.scoreText = new fabric.Text('Score: 0', {
            fontSize: 20,
            fill: 'white',
            left: x,
            top: y
        });

        this.levelText = new fabric.Text('Level: 1', {
            fontSize: 20,
            fill: 'white',
            left: x,
            top: y + 30 // Un peu en dessous du score
        });

        // Initialisation des nouveaux textes
        this.healthText = new fabric.Text('Health: 3', {
            fontSize: 20,
            fill: 'white',
            left: x,
            top: y + 60 // Un peu en dessous du niveau
        });

        this.shieldText = new fabric.Text('Shield: 0', {
            fontSize: 20,
            fill: 'white',
            left: x,
            top: y + 90 // Un peu en dessous de la santé
        });
    }

    public update(): void {
        // Mettre à jour les textes avec les valeurs actuelles du playerService
        const player = this.playerService.getPlayer(); // Récupération de l'instance du joueur pour accéder à ses propriétés
        this.scoreText.text = `Score: ${player.score}`;
        this.levelText.text = `Level: ${player.level}`;
        this.healthText.text = `Health: ${player.health}`; // Mise à jour des points de vie
        this.shieldText.text = `Shield: ${player.shield}`; // Mise à jour du bouclier
    }

    public getFabricObjects(): fabric.Object[] {
        // Retourner les objets fabric pour le rendu
        return [this.scoreText, this.levelText, this.healthText, this.shieldText];
    }
}
