import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { Button } from "../button/Button";
import { AppConfig } from "../../core/config/AppConfig";

export class Menu implements IRenderable, IInteractive {
    private buttons: Button[] = [];
    private selectedIndex: number = 0;
    private inputManager: InputManager;
    private subscriptionId: number;
    private menuBackground: fabric.Rect;

    constructor(buttonNames: string[], buttonActions: (() => void)[]) {
        this.inputManager = InputManager.getInstance();
        this.subscriptionId = this.inputManager.subscribe(this);

        const config = AppConfig.getInstance();
        const menuWidth = 250;
        const buttonHeight = 40;
        const spacing = 10;
        const menuHeight = buttonNames.length * (buttonHeight + spacing) + spacing * 2;

        // Création du fond du menu
        this.menuBackground = new fabric.Rect({
            left: (config.canvasWidth - menuWidth) / 2,
            top: (config.canvasHeight - menuHeight) / 2,
            fill: 'rgba(0,0,0,0.7)',
            width: menuWidth,
            height: menuHeight,
            rx: 10,
            ry: 10,
            stroke: '#FFF',
            strokeWidth: 2,
            shadow: 'rgba(0,0,0,0.5) 5px 5px 10px',
            selectable: false,
        });

        // Création et positionnement des boutons
        let posY = this.menuBackground.top + spacing;
        buttonNames.forEach((name, index) => {
            const button = new Button(name, { x: config.canvasWidth / 2, y: posY }, menuWidth - spacing * 2, buttonHeight);
            button.triggerAction = buttonActions[index];
            this.buttons.push(button);
            posY += buttonHeight + spacing;
        });

        this.highlightSelectedButton();
    }

    getDrawableObjects(): fabric.Object[] {
        return this.buttons.flatMap(button => button.getDrawableObjects());
    }

    handleInput(inputType: UserInputType): void {
        switch (inputType) {
            case UserInputType.Up:
                this.selectPreviousButton();
                break;
            case UserInputType.Down:
                this.selectNextButton();
                break;
            case UserInputType.Enter:
                this.buttons[this.selectedIndex].trigger();
                break;
        }
    }

    cleanup(): void {
        this.inputManager.unsubscribe(this.subscriptionId);
    }

    private selectNextButton(): void {
        this.selectedIndex = (this.selectedIndex + 1) % this.buttons.length;
        this.highlightSelectedButton();
    }

    private selectPreviousButton(): void {
        this.selectedIndex = (this.selectedIndex - 1 + this.buttons.length) % this.buttons.length;
        this.highlightSelectedButton();
    }

    private highlightSelectedButton(): void {
        this.buttons.forEach((button, index) => button.setHighlight(index === this.selectedIndex));
    }
}