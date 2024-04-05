import { IRenderable } from "../../core/renderer/Irenderable";
import { CraftRecipe } from "../../game-services/bonus-craft/library/CraftRecipe";

export class CraftingRecipeDisplay implements IRenderable {
    private recipes: CraftRecipe[];
    private fabricObjects: fabric.Object[] = [];

    constructor(recipes: CraftRecipe[]) {
        this.recipes = recipes;
        this.updateDisplay();
    }

    updateDisplay(): void {
        // Implementation pour afficher les recettes
        // Pour chaque recette, affichez les ingrédients nécessaires
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return this.fabricObjects;
    }
}
