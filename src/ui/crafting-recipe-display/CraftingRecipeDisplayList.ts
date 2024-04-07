import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { CraftRecipe } from "../../game-services/bonus-craft/library/CraftRecipe";
import { GameBonusType } from "../../entities/bonus/GameBonusTypes";

export class CraftingRecipeDisplayList implements IRenderable, IInteractive {
    private recipes: CraftRecipe[];
    private subscriptionId: number;
    private fabricObjects: fabric.Text[] = [];
    private filterBonusType?: GameBonusType; 
    private selectedIndex: number = 0;
    private isActive: boolean = false;
    public onRecipeSelected: (selectedRecipe: CraftRecipe) => void;

    constructor(recipes: CraftRecipe[]) {
        this.recipes = recipes;
        this.subscriptionId = InputManager.getInstance().subscribe(this);
        this.updateDisplay();
    }

    filterRecipes(filterBonusType?: GameBonusType): void {
        this.filterBonusType = filterBonusType;
        this.updateDisplay();
    }

    private updateDisplay(): void {
        this.fabricObjects = [];
        let topOffset = 50;
        const filteredRecipes = this.filterRecipesList();

        filteredRecipes.forEach((recipe, index) => {
            const recipeText = `Craft ${recipe.resultBonus}`;
            const text = new fabric.Text(recipeText, {
                left: 100,
                top: topOffset + (index * 30),
                fontSize: 16,
                fill: this.selectedIndex === index ? 'yellow' : 'white',
                fontFamily: 'Arial',
            });
            this.fabricObjects.push(text);
        });
    }

    private filterRecipesList(): CraftRecipe[] {
        return this.filterBonusType
            ? this.recipes.filter(recipe => recipe.requiredBonuses.includes(this.filterBonusType))
            : this.recipes;
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return this.fabricObjects;
    }

    handleInput(inputType: UserInputType): void {
        const recipesCount = this.fabricObjects.length;
        if (inputType === UserInputType.Up && this.selectedIndex > 0) {
            this.isActive = true;
            this.selectedIndex--;
            this.updateDisplay();
        } else if (inputType === UserInputType.Down && this.selectedIndex < recipesCount - 1) {
            this.isActive = true;
            this.selectedIndex++;
            this.updateDisplay();
        } else if (inputType === UserInputType.Enter) {
            if(!this.isActive) {
                return;
            }
            const selectedRecipe = this.filterRecipesList()[this.selectedIndex];
            if (this.onRecipeSelected) {
                console.log('Recipe selected', selectedRecipe);
                this.onRecipeSelected(selectedRecipe);
            }
        } else if (inputType === UserInputType.Left) {
            this.isActive = false;
        } else if (inputType === UserInputType.Right) {
            this.isActive = false;
        }
    }

    cleanup(): void {
        InputManager.getInstance().unsubscribe(this.subscriptionId);
    }
}