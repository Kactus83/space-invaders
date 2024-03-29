import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { GroundLine } from "../../entities/ground-line/GroundLine";
import { Invader } from "../../entities/invader/Invader";
import { Player } from "../../entities/player/Player";
import { GamePlayScene } from "../../scenes/game-play/GameplayScene";
import { InvaderWaveService } from "../invader-wave/InvaderWaveService";

export class GameStatusService {
    private player: Player;
    private invaderWaveService: InvaderWaveService;
    private groundLine: GroundLine;
    private gamePlayScene: GamePlayScene;

    constructor(player: Player, invaderWaveService: InvaderWaveService, gamePlayScene: GamePlayScene, groundLine: GroundLine) {
        this.player = player;
        this.invaderWaveService = invaderWaveService;
        this.gamePlayScene = gamePlayScene;
        this.groundLine = groundLine;
    }

    update(): void {
        this.checkWinCondition();
        this.checkLoseCondition();
        // Vous pouvez aussi ajouter ici la logique pour passer au niveau suivant si nécessaire
    }
    
    private handleGameWin(): void {
        SceneManager.getInstance().changeScene(SceneIds.Victory);
    }

    private handleGameLose(): void {
        SceneManager.getInstance().changeScene(SceneIds.Defeat);
    }

    private checkWinCondition(): void {
        // Condition de victoire (par exemple, tous les envahisseurs ont été détruits)
        if (this.invaderWaveService.allWavesCompleted && this.gamePlayScene.allInvadersDead) {
            console.log("Game won!", this.invaderWaveService.allWavesCompleted, this.gamePlayScene.allInvadersDead);
            this.handleGameWin();
        }
    }

    private checkLoseCondition(): void {
        // Condition de défaite (par exemple, le joueur n'a plus de vie ou les envahisseurs atteignent la groundLine)
        if (this.player.healthSystem.health <= 0 || this.groundLine.healthSystem.health <= 0) {
            this.handleGameLose();
        }
    }
}
