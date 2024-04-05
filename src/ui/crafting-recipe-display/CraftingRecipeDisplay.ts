import { IRenderable } from "../../core/renderer/Irenderable";
import { CraftingRecipeDisplayList } from "./CraftingRecipeDisplayList";
import { CraftingRecipeCard } from "./CraftingRecipeCard";
import { CraftRecipe } from "../../game-services/bonus-craft/library/CraftRecipe";
import { craftRecipes } from "../../game-services/bonus-craft/library/CraftRecipes";

export class CraftingRecipeDisplay implements IRenderable {
    private displayList: CraftingRecipeDisplayList;
    private displayCard: CraftingRecipeCard | null = null;
    public onCraft: (recipe: CraftRecipe) => void;

    constructor() {
        this.displayList = new CraftingRecipeDisplayList(craftRecipes);
        this.displayList.onRecipeSelected = this.handleRecipeSelected.bind(this);
    }

    private handleRecipeSelected(selectedRecipe: CraftRecipe): void {
        // Correction: Assurez-vous que onCraftRequested et onBackToListRequested sont correctement utilisés.
        this.displayCard = new CraftingRecipeCard(selectedRecipe);
        this.displayCard.onCraftRequested = () => {
            this.onCraft && this.onCraft(selectedRecipe);
            this.displayCard = null; // Retour à la liste après le crafting
        };
        this.displayCard.onBackToListRequested = () => {
            this.displayCard = null; // Permet de retourner à la liste
        };
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        if (this.displayCard) {
            return this.displayCard.getDrawableObjects();
        }
        return this.displayList.getDrawableObjects();
    }

    public cleanup(): void {
        this.displayList.cleanup();
        this.displayCard?.cleanup();
    }
}
