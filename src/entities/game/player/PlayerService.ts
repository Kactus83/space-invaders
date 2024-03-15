import { Player } from './Player';
import { InputManager } from '../../../inputs/InputManager';
import { ThemeManager } from '../../../themes/ThemeManager';
import { UserInputType } from '../../../inputs/UserInputType';

export class PlayerService {
    private player: Player;

    constructor(private inputManager: InputManager, private themeManager: ThemeManager, x: number, y: number) {
        this.player = new Player(themeManager, x, y);
        this.subscribeToInput();
    }

    private subscribeToInput(): void {
        console.log("subscribe to input");
        this.inputManager.subscribe((inputType: UserInputType) => {
            console.log("input received : ", inputType);
            switch(inputType) {
                case UserInputType.Left:
                    this.player.moveLeft();
                    break;
                case UserInputType.Right:
                    this.player.moveRight();
                    break;
                case UserInputType.Shoot:
                    this.player.shoot();
                    break;
                // Ajoutez d'autres cas au besoin
            }
        });
    }
    
    public async initializePlayer(): Promise<void> {
        await this.player.loadDesign();
    }
    

    public update(deltaTime: number): void {
        this.player.update(deltaTime);
    }

    public getFabricObject(): fabric.Object {
        return this.player.fabricObject;
    }

    public cleanup(): void {
        // Se désabonner lors de la destruction du service pour éviter les fuites de mémoire
        this.inputManager.unsubscribe(this.subscribeToInput);
    }
}
