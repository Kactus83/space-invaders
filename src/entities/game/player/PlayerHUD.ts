import { fabric } from 'fabric';
import { PlayerService } from './PlayerService';

export class PlayerHUD {
    private scoreText: fabric.Text;
    private levelText: fabric.Text;

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
    }

    public update(): void {
        // Mettre à jour les textes avec les valeurs actuelles du playerService
        this.scoreText.text = `Score: ${this.playerService.getPlayer().score}`;
        this.levelText.text = `Level: ${this.playerService.getPlayer().level}`;
    }

    public getFabricObjects(): fabric.Object[] {
        // Retourner les objets fabric pour le rendu
        return [this.scoreText, this.levelText];
    }
}
