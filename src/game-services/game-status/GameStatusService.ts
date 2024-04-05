import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { GroundLine } from "../../entities/ground-line/GroundLine";
import { Invader } from "../../entities/invader/Invader";
import { Player } from "../../entities/player/Player";
import { GamePlayScene } from "../../scenes/game-play/GameplayScene";
import { InvaderWaveService } from "../invader-wave/InvaderWaveService";
import { PlayerProfile } from "../player-profile/PlayerProfile";

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
        this.player.bonusManagementSystem.cleanAndStoreAvailableBonuses();
        this.recordGameSessionStats(true);
        SceneManager.getInstance().changeScene(SceneIds.Victory);
    }

    private handleGameLose(): void {
        this.player.bonusManagementSystem.cleanAndStoreAvailableBonuses();
        this.recordGameSessionStats(false);
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

    private recordGameSessionStats(isWinningSession: boolean): void {
        const playerProfile = PlayerProfile.getInstance();
        const gameSessionStats = this.player.experienceSystem.getGameSessionStats();
        
        // Ici, vous allez ajouter toutes les informations pertinentes à gameSessionStats
        // Par exemple :
        gameSessionStats.setWinningSessionBool(isWinningSession);
        
        // Vous devez adapter cette partie pour qu'elle corresponde à votre logique de jeu,
        // par exemple, en parcourant les ennemis tués, en calculant le score, etc.
        // gameSessionStats.addKill(invaderType, scoreValue); // Pour chaque type d'invader tué
        
        // Finalement, enregistrez ces stats dans le profil du joueur
        playerProfile.getExperience().addGameSessionStats(gameSessionStats);
    }
}
