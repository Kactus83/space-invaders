import { GroundLine } from "../../entities/ground-line/GroundLine";
import { Invader } from "../../entities/invader/Invader";
import { Player } from "../../entities/player/Player";

export class GameStatusService {
    private player: Player;
    private invaders: Invader[];
    private groundLine: GroundLine;
    private onGameWin: () => void;
    private onGameLose: () => void;
    private onLevelChange: (newLevel: number) => void;

    constructor(player: Player, invaders: Invader[], groundLine: GroundLine, 
                onGameWin: () => void, onGameLose: () => void, onLevelChange: (newLevel: number) => void) {
        this.player = player;
        this.invaders = invaders;
        this.groundLine = groundLine;
        this.onGameWin = onGameWin;
        this.onGameLose = onGameLose;
        this.onLevelChange = onLevelChange;
    }

    update(): void {
        this.checkWinCondition();
        this.checkLoseCondition();
        // Vous pouvez aussi ajouter ici la logique pour passer au niveau suivant si nécessaire
    }

    private checkWinCondition(): void {
        // Condition de victoire (par exemple, tous les envahisseurs ont été détruits)
        if (this.invaders.length === 0) {
            this.onGameWin();
        }
    }

    private checkLoseCondition(): void {
        // Condition de défaite (par exemple, le joueur n'a plus de vie ou les envahisseurs atteignent la groundLine)
        if (this.player.healthSystem.health <= 0 || this.groundLine.healthSystem.health <= 0) {
            this.onGameLose();
        }
    }
}
