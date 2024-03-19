import { config } from "../../config/config";
import { InvaderService } from "../../entities/game/invader/InvaderService";
import { PlayerService } from "../../entities/game/player/PlayerService";
import { WallService } from "../../entities/game/wall/WallService";
import { SceneManager } from "../../scenes/SceneManager";
import { SceneIds } from "../../scenes/types/SceneIds";

export class WaveManagementService {
    public isInitialized: boolean = false;
    private currentWaveIndex: number = 0;
    private totalWaves: number = 5;

    constructor(
        private invaderService: InvaderService,
        private wallService: WallService,
        private playerService: PlayerService,
        private sceneManager: SceneManager
    ) {}


    async initializeWave(): Promise<void> {
        this.isInitialized = false;
        console.log(`Initializing wave: ${this.currentWaveIndex + 1}`);
        if (this.currentWaveIndex >= this.totalWaves) {
            console.log("All waves completed. Changing to GameWin scene.");
            this.sceneManager.changeScene(SceneIds.GameWin);
            return;
        }
    
        this.invaderService.cleanup();
        this.wallService.cleanup();
    
        const waveKey = `wave${this.currentWaveIndex + 1}`;
        console.log(`Loading walls for wave: ${waveKey}`);
        await this.wallService.initializeWallsForWave(waveKey);
        console.log(`Loading invaders for wave: ${waveKey}`);
        await this.invaderService.initializeWave(waveKey);
        this.currentWaveIndex++;
        this.isInitialized = true;
    }
    

    public async checkGameStatus(): Promise<void> {
        const player = this.playerService.getPlayer();
        const defenseLine = config.canvas.height - (player.fabricObject.height + 5);

        this.invaderService.getInvaders().forEach(invader => {
            if (invader.fabricObject.top + invader.fabricObject.height >= defenseLine) {
                this.sceneManager.changeScene(SceneIds.GameLose);
            }
        });

        if (player.health <= 0) {
            this.sceneManager.changeScene(SceneIds.GameLose);
        } else if (this.invaderService.getInvaders().length === 0) {
            console.log("All invaders destroyed. Changing to GameWin scene.");
            // Prépare la prochaine vague ou termine le jeu si toutes les vagues sont passées
            await this.initializeWave();
        }
    }
}
