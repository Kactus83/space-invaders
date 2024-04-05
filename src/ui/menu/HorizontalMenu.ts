import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { AppConfig } from "../../core/config/AppConfig";

export class HorizontalMenu implements IRenderable {
    private inputManager: InputManager;
    private subscriptionId: number;
    private buttons: fabric.IText[] = [];
    private selectedIndex: number = 0;
    private actions: (() => void)[];
    private menuBackground: fabric.Rect;

    constructor(buttonNames: string[], buttonActions: (() => void)[]) {
        this.inputManager = InputManager.getInstance();
        this.subscriptionId = this.inputManager.subscribe(this);
        const config = AppConfig.getInstance();
        this.actions = buttonActions;

        // Dimensions and positioning
        const menuWidth = config.canvasWidth; // Full width
        const buttonWidth = menuWidth / buttonNames.length;
        const menuHeight = 50; // Adjust as necessary

        // Create menu background
        this.menuBackground = new fabric.Rect({
            left: 0,
            top: 0,
            fill: 'rgba(0,0,0,0.8)', // Slightly transparent
            width: menuWidth,
            height: menuHeight,
            selectable: false,
        });

        // Create and position buttons
        buttonNames.forEach((name, index) => {
            const button = new fabric.IText(name, {
                left: index * buttonWidth + buttonWidth / 2,
                top: menuHeight / 2,
                fontSize: 20,
                fill: '#FFFFFF',
                textAlign: 'center',
                originX: 'center',
                originY: 'center',
                selectable: false,
                hoverCursor: 'pointer',
            });
            this.buttons.push(button);
        });
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return [this.menuBackground, ...this.buttons];
    }

    handleInput(inputType: UserInputType): void {
        switch (inputType) {
            case UserInputType.Left:
                this.selectPreviousButton();
                break;
            case UserInputType.Right:
                this.selectNextButton();
                break;
            case UserInputType.Enter:
                this.triggerSelectedAction();
                break;
        }
    }

    private selectNextButton(): void {
        this.selectedIndex = (this.selectedIndex + 1) % this.buttons.length;
        this.highlightSelectedButton();
    }

    private selectPreviousButton(): void {
        this.selectedIndex = (this.selectedIndex - 1 + this.buttons.length) % this.buttons.length;
        this.highlightSelectedButton();
    }

    private triggerSelectedAction(): void {
        const action = this.actions[this.selectedIndex];
        if (action) {
            action();
        }
    }

    private highlightSelectedButton(): void {
        this.buttons.forEach((button, index) => {
            button.set({
                fill: index === this.selectedIndex ? 'yellow' : 'white'
            });
        });
    }

    cleanup(): void {
        this.inputManager.unsubscribe(this.subscriptionId);
    }
}
