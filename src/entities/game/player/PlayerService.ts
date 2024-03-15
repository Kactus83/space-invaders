import { Player } from './Player';
import { InputManager } from '../../../inputs/InputManager';
import { ThemeManager } from '../../../themes/ThemeManager';
import { UserInputType } from '../../../inputs/UserInputType';
import { ProjectileService } from '../projectile/ProjectileService';

export class PlayerService {
    private player: Player; 

    constructor(
        private inputManager: InputManager, 
        private themeManager: ThemeManager, 
        x: number, 
        y: number,
        private projectileService: ProjectileService
        ) 
    {
        this.player = new Player(themeManager, x, y);
        this.subscribeToInput();
    }

    private subscribeToInput(): void {
        this.inputManager.subscribe((inputType: UserInputType) => {
            switch(inputType) {
                case UserInputType.Left:
                    this.player.moveLeft();
                    break;
                case UserInputType.Right:
                    this.player.moveRight();
                    break;
                case UserInputType.Shoot:
                    this.shoot();
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

    private shoot(): void {
        // Déterminer la position initiale du projectile
        const projectileX = this.player.fabricObject.left + this.player.fabricObject.width / 2;
        const projectileY = this.player.fabricObject.top;

        // Demander au ProjectileService de créer un projectile
        this.projectileService.createProjectileForPlayerLevel(this.player.level, projectileX, projectileY);
    }
}
