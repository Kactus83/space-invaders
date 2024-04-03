import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { Player } from "../../entities/player/Player";
import { GroundLine } from "../../entities/ground-line/GroundLine";
import { AppConfig } from "../../core/config/AppConfig";
import { BonusDisplayComponent } from "../bonus-display/BonusDisplayComponent";

export class HUD implements IRenderable, IInteractive {
    private visible: boolean = true;
    private player: Player;
    private groundLine: GroundLine;
    private bonusDisplayComponent: BonusDisplayComponent;
    private fabricObjects: fabric.Object[] = [];
    private subscriptionId: number;

    constructor(player: Player, groundLine: GroundLine) {
        this.player = player;
        this.groundLine = groundLine;
        const inputManager = InputManager.getInstance();
        this.subscriptionId = inputManager.subscribe(this);
        this.bonusDisplayComponent = new BonusDisplayComponent(player.bonusManagementSystem.availableBonuses, player.bonusManagementSystem.activeBonuses);
        this.updateHUD();
    }

    handleInput(inputType: UserInputType): void {
        if (inputType === UserInputType.ToggleHUD) {
            this.visible = !this.visible;
            this.updateHUD();
        }
    }

    public updateHUD(): void {
        this.fabricObjects = []; // Clear existing objects
        if (!this.visible) return;

        const config = AppConfig.getInstance();
        const hudHeight = 30;
        const hud = new fabric.Rect({
            left: 0,
            top: 0,
            fill: 'black',
            width: config.canvasWidth,
            height: hudHeight,
            selectable: false,
        });
        this.fabricObjects.push(hud);

        // Player Info
        const playerInfo = `Score: ${this.player.experienceSystem.currentScore} | HP: ${this.player.healthSystem.health} | Shield: ${this.player.healthSystem.shield} | Level: ${this.player.experienceSystem.level}`;
        const playerText = new fabric.Text(playerInfo, {
            left: 10,
            top: hudHeight / 2,
            fontSize: 14,
            fill: 'white',
            originY: 'center',
        });
        this.fabricObjects.push(playerText);

        // GroundLine Info
        const groundLineInfo = `GroundLine HP: ${this.groundLine.healthSystem.health} | Shield: ${this.groundLine.healthSystem.shield}`;
        const groundLineText = new fabric.Text(groundLineInfo, {
            left: config.canvasWidth / 2,
            top: hudHeight / 2,
            fontSize: 14,
            fill: 'white',
            originY: 'center',
        });
        this.fabricObjects.push(groundLineText);

        // Bonus
        this.bonusDisplayComponent.setBonuses(this.player.bonusManagementSystem.availableBonuses, this.player.bonusManagementSystem.activeBonuses);
        this.fabricObjects.push(...this.bonusDisplayComponent.getDrawableObjects());
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return this.visible ? this.fabricObjects : [];
    }

    cleanup(): void {
        InputManager.getInstance().unsubscribe(this.subscriptionId);
    }
}
