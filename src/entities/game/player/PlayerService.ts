import { Player } from './Player';
import { InputManager } from '../../../game-services/inputs/InputManager';
import { ThemeManager } from '../../../themes/ThemeManager';
import { UserInputType } from '../../../game-services/inputs/UserInputType';
import { ProjectileService } from '../projectile/ProjectileService';
import { config } from '../../../config/config';
import { PlayerLevels } from './PlayerLevels';

export class PlayerService {
    private player: Player; 
    private lastShootTime: number = 0;

    constructor(
        private inputManager: InputManager, 
        private themeManager: ThemeManager,
        private projectileService: ProjectileService
        ) 
    {
        this.player = new Player(themeManager, config.player.playerStartPositionX, config.player.playerStartPositionY);
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

    public getPlayer(): Player {
        return this.player;
    }

    public cleanup(): void {
        // Se désabonner lors de la destruction du service pour éviter les fuites de mémoire
        this.inputManager.unsubscribe(this.subscribeToInput);
    }

    private shoot(): void {
        const currentTime = Date.now();
        const fireRate = PlayerLevels[this.player.level.toString()].fireRate;
        const timeBetweenShots = 1000 / fireRate;

        if (currentTime - this.lastShootTime < timeBetweenShots) {
            return; // Si le délai n'est pas écoulé, ne pas tirer
        }

        this.lastShootTime = currentTime;
        const projectileType = PlayerLevels[this.player.level.toString()].projectileType; // Utilisez le projectileType du niveau actuel
        const projectileX = this.player.fabricObject.left + this.player.fabricObject.width / 2;
        const projectileY = this.player.fabricObject.top;

        // Créez un projectile en utilisant le type spécifié pour le niveau actuel du joueur
        this.projectileService.createProjectile(projectileType, projectileX, projectileY);
    }  

    public increaseScore(points: number): void {
        this.player.increaseScore(points);
    }
}
