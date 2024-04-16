import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { CraftRecipe } from "../../game-services/bonus-craft/library/CraftRecipe";

export class CraftingRecipeCard implements IRenderable, IInteractive {
    private isActive: boolean = false;
    private subscriptionId: number;
    private recipe: CraftRecipe;
    private fabricObjects: fabric.Object[] = [];
    private buttons: fabric.IText[] = [];
    private selectedIndex: number = 3;
    public onCraftRequested: () => void;
    public onBackToListRequested: () => void;

    constructor(recipe: CraftRecipe) {
        this.recipe = recipe;
        this.subscriptionId = InputManager.getInstance().subscribe(this);
        this.createCard();
    }

    private createCard(): void {
        // Création de la carte
        const cardBackground = new fabric.Rect({
            left: 100,
            top: 100,
            width: 300,
            height: 200,
            fill: 'grey',
            rx: 10,
            ry: 10,
        });

        const title = new fabric.Text(`Crafting ${this.recipe.resultBonus}`, {
            left: 105,
            top: 105,
            fontSize: 20,
            fill: 'white',
        });

        const requirementsText = `Requires: ${this.recipe.requiredBonuses.join(", ")}`;
        const requirements = new fabric.Text(requirementsText, {
            left: 105,
            top: 135,
            fontSize: 16,
            fill: 'white',
        });

        const craftButton = new fabric.IText("Craft", {
            left: 150,
            top: 170,
            fontSize: 18,
            fill: 'green',
            selectable: false,
        });

        const backButton = new fabric.IText("Back to list", {
            left: 150,
            top: 200,
            fontSize: 18,
            fill: 'blue',
            selectable: false,
        });

        this.buttons.push(craftButton, backButton);
        this.fabricObjects = [cardBackground, title, requirements, ...this.buttons];
        this.highlightSelectedButton();
    }

    private highlightSelectedButton(): void {
        this.buttons.forEach((button, index) => {
            button.set({ fill: this.selectedIndex === index ? 'yellow' : 'white' });
        });
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return this.fabricObjects;
    }

    handleInput(inputType: UserInputType): void {
        switch (inputType) {
            case UserInputType.Left:
                this.isActive = false;
                break;
            case UserInputType.Right:
                this.isActive = false;
                break;
            case UserInputType.Up:
                this.isActive = true;
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.highlightSelectedButton();
                break;
            case UserInputType.Down:
                this.isActive = true;
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.buttons.length - 1);
                this.highlightSelectedButton();
                break;
            case UserInputType.Enter:
                if(!this.isActive) {
                    return;
                }

                if (this.selectedIndex === 0 && this.onCraftRequested) {
                    this.onCraftRequested();
                } else if (this.selectedIndex === 1 && this.onBackToListRequested) {
                    this.onBackToListRequested();
                }
                break;
        }
    }

    cleanup(): void {
        InputManager.getInstance().unsubscribe(this.subscriptionId);
    }
}
