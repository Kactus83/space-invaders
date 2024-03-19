import { config } from "../../config/config";
import { InvaderService } from "../../entities/game/invader/InvaderService";
import { PlayerService } from "../../entities/game/player/PlayerService";
import { SceneManager } from "../../scenes/SceneManager";
import { SceneIds } from "../../scenes/types/SceneIds";

export class EndGameService {
    constructor(
        private invaderService: InvaderService,
        private playerService: PlayerService,
        private sceneManager: SceneManager
    ) {}

    checkGameStatus() {
        if (this.invaderService.getInvaders().length === 0) {
            // Tous les invaders ont été détruits
            this.sceneManager.changeScene(SceneIds.GameWin);
        }

        const player = this.playerService.getPlayer();
        const defenseLine = config.canvas.height - (player.fabricObject.height + 5); 

        this.invaderService.getInvaders().forEach(invader => {
            if (invader.fabricObject.top + invader.fabricObject.height >= defenseLine) {
                // Un invader a atteint la zone limite près du joueur
                this.sceneManager.changeScene(SceneIds.GameLose);
            }
        });

        // Vérifier la santé du joueur pour déterminer la fin de partie
        if (player.health <= 0) {
            this.sceneManager.changeScene(SceneIds.GameLose);
        }
    }
}
