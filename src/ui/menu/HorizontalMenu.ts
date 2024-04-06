import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { AppConfig } from "../../core/config/AppConfig";
import { SquareButton } from "../button/SquareButton";

export class HorizontalMenu implements IRenderable {
    private isActive: boolean = false;
    private inputManager: InputManager;
    private subscriptionId: number;
    private buttons: SquareButton[] = [];
    private selectedIndex: number = 0;
    private actions: (() => void)[];
    private menuBackground: fabric.Rect;

    constructor(buttonNames: string[], buttonActions: (() => void)[]) {
        this.inputManager = InputManager.getInstance();
        this.subscriptionId = this.inputManager.subscribe(this);
        const config = AppConfig.getInstance();
        this.actions = buttonActions;

        // Dimensions and positioning
        const menuWidth = config.canvasWidth;
        const menuHeight = 50;
        const buttonSize = 50; // Taille carrée pour les boutons
        const buttonSpacing = 10; // Espacement entre les boutons
        const totalButtonsWidth = buttonNames.length * buttonSize + (buttonNames.length - 1) * buttonSpacing;
        const startLeft = (config.canvasWidth - totalButtonsWidth) / 2 + buttonSize / 2; // Calcul pour centrer les boutons

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
            const positionX = startLeft + index * (buttonSize + buttonSpacing);
            const button = new SquareButton(name, { x: positionX, y: menuHeight / 2 }, buttonSize);
            button.triggerAction = buttonActions[index];
            this.buttons.push(button);
        });
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        let drawableObjects = [this.menuBackground];
        for (const button of this.buttons) {
            const buttonObjects = await button.getDrawableObjects();
            drawableObjects = drawableObjects.concat(buttonObjects);
        }
        return drawableObjects;
    }  

    handleInput(inputType: UserInputType): void {
        switch (inputType) {
            case UserInputType.Left:
                if(this.isActive) {
                    this.selectPreviousButton();
                }else{
                    this.activateMenu();
                }
                break;
            case UserInputType.Right:
                if(this.isActive) {
                    this.selectNextButton();
                }else{
                    this.activateMenu();
                }
                break;
            case UserInputType.Enter:
                if(this.isActive) {
                    this.buttons[this.selectedIndex].trigger();
                }
                break;            
            case UserInputType.Up:
            case UserInputType.Down:
                if(this.isActive) {
                    this.deactivateMenu();
                }
                break;
        }
    } 
    
    public activateMenu(): void {
        this.isActive = true;
        this.highlightSelectedButton();
    }
    
    public deactivateMenu(): void {
        this.buttons.forEach((button) => {
            button.setHighlight(false)
        });
        this.isActive = false;
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
            button.setHighlight(index === this.selectedIndex)
        });
    }

    cleanup(): void {
        this.inputManager.unsubscribe(this.subscriptionId);
    }
}
