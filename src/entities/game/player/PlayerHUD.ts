import { fabric } from 'fabric';
import { PlayerService } from './PlayerService';

export class PlayerHUD {
    private scoreText: fabric.Text;
    private levelText: fabric.Text;
    private healthText: fabric.Text; 
    private shieldText: fabric.Text; 

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
            top: y + 30 
        });

        // Initialisation des nouveaux textes
        this.healthText = new fabric.Text('Health: 3', {
            fontSize: 20,
            fill: 'white',
            left: x,
            top: y + 60 
        });

        this.shieldText = new fabric.Text('Shield: 0', {
            fontSize: 20,
            fill: 'white',
            left: x,
            top: y + 90 
        });
    }

    public update(): void {
        const player = this.playerService.getPlayer();
        this.scoreText.text = `Score: ${player.score}`;
        this.levelText.text = `Level: ${player.level}`;
        this.healthText.text = `Health: ${player.health}`;
        this.shieldText.text = `Shield: ${player.shield}`; 
    }

    public getFabricObjects(): fabric.Object[] {
        return [this.scoreText, this.levelText, this.healthText, this.shieldText];
    }
}
