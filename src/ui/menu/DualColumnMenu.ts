import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { SquareButton } from "../button/SquareButton"; // Utilisez SquareButton
import { AppConfig } from "../../core/config/AppConfig";

export class DualColumnMenu implements IRenderable, IInteractive {
    private isActive: boolean = false;
    private leftButtons: SquareButton[] = [];
    private rightButtons: SquareButton[] = [];
    private selectedIndex: number = 0;
    private inputManager: InputManager;
    private subscriptionId: number;
    private menuBackground: fabric.Rect;

    constructor(leftButtonNames: string[], rightButtonNames: string[], leftButtonActions: (() => void)[]) {
        this.inputManager = InputManager.getInstance();
        this.subscriptionId = this.inputManager.subscribe(this);

        const config = AppConfig.getInstance();
        const canvasWidth = config.canvasWidth;
        const buttonPadding = 7;
        const buttonSize = 50; // Taille des SquareButton
        const menuHeight = leftButtonNames.length * (buttonSize + buttonPadding) + buttonPadding * 4;

        // Création du fond du menu
        this.menuBackground = new fabric.Rect({
            left: 0,
            top: (config.canvasHeight - menuHeight) / 2,
            fill: 'rgba(0,0,0,0.7)',
            width: canvasWidth,
            height: menuHeight,
            rx: 10,
            ry: 10,
            stroke: '#FFF',
            strokeWidth: 2,
            selectable: false,
        });

        // Création des boutons de gauche
        let posY = this.menuBackground.top + buttonPadding * 3;
        leftButtonNames.forEach((name, index) => {
            const button = new SquareButton(name, { x: canvasWidth / 4, y: posY }, buttonPadding);
            button.triggerAction = leftButtonActions[index];
            this.leftButtons.push(button);
            posY += buttonSize + buttonPadding;
        });

        // Création des boutons de droite (statiques, pour affichage seulement)
        posY = this.menuBackground.top + buttonPadding * 3;
        rightButtonNames.forEach((name, index) => {
            const button = new SquareButton(name, { x: (canvasWidth / 4) * 3, y: posY }, buttonPadding);
            button.isSelectable = false;
            this.rightButtons.push(button);
            posY += buttonSize + buttonPadding;
        });
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        const objects = [this.menuBackground];
        const leftDrawables = await Promise.all(this.leftButtons.map(button => button.getDrawableObjects()));
        const rightDrawables = await Promise.all(this.rightButtons.map(button => button.getDrawableObjects()));
        return objects.concat(...leftDrawables, ...rightDrawables);
    }

    handleInput(inputType: UserInputType): void {

        switch (inputType) {
            case UserInputType.Up:
                console.log('Up');
                this.selectPreviousButton();
                break;
            case UserInputType.Down:
                console.log('Down');
                this.selectNextButton();
                break;
            case UserInputType.Enter:
                if(this.isActive) {
                    this.leftButtons[this.selectedIndex].trigger();
                }
                break;
            case UserInputType.Left:
            case UserInputType.Right:
                this.deactivateMenu();
                break;
        }
    }

    public updateRightButtonStates(states: string[]): void {
        states.forEach((state, index) => {
            // Assurez-vous d'avoir une méthode ou une logique pour mettre à jour l'état du bouton de droite
            // Cela pourrait être simplement changer le texte du bouton ou sa couleur de fond
            this.rightButtons[index].updateText(state);
        });
    }
    
    getLeftButtonNames(): string[] {
        return this.leftButtons.map(button => button.getText());
    }

    public activateMenu(): void {
        this.isActive = true;
        this.highlightSelectedButton();
    }

    public deactivateMenu(): void {
        this.leftButtons.forEach((button, index) => button.setHighlight(false));
        this.isActive = false;
    }

    private selectNextButton(): void {
        this.isActive = true;
        this.selectedIndex = (this.selectedIndex + 1) % this.leftButtons.length;
        this.highlightSelectedButton();
    }

    private selectPreviousButton(): void {
        this.isActive = true;
        this.selectedIndex = (this.selectedIndex - 1 + this.leftButtons.length) % this.leftButtons.length;
        this.highlightSelectedButton();
    }

    private highlightSelectedButton(): void {
        this.leftButtons.forEach((button, index) => button.setHighlight(index === this.selectedIndex));
    }

    cleanup(): void {
        this.inputManager.unsubscribe(this.subscriptionId);
        this.leftButtons.forEach(button => button.cleanup());
        this.rightButtons.forEach(button => button.cleanup());
    }
}
