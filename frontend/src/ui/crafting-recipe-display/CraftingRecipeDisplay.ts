import { IRenderable } from "../../core/renderer/Irenderable";
import { CraftingRecipeDisplayList } from "./CraftingRecipeDisplayList";
import { CraftingRecipeCard } from "./CraftingRecipeCard";
import { CraftRecipe } from "../../game-services/bonus-craft/library/CraftRecipe";
import { craftRecipes } from "../../game-services/bonus-craft/library/CraftRecipes";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";

export class CraftingRecipeDisplay implements IRenderable {
    private displayList: CraftingRecipeDisplayList | null;
    private displayCard: CraftingRecipeCard | null = null;
    public onCraft: (recipe: CraftRecipe) => void;
    public onRecipeSelected: (recipe: CraftRecipe) => void;
    public onBackToListRequested: () => void;

    constructor() {
        this.displayList = new CraftingRecipeDisplayList(craftRecipes);
        this.displayList.onRecipeSelected = this.handleRecipeSelected.bind(this);
    }

    private handleRecipeSelected(selectedRecipe: CraftRecipe): void {
        this.displayList.cleanup();
        this.displayList = null;
        this.displayCard = new CraftingRecipeCard(selectedRecipe);
        this.displayCard.onCraftRequested = () => {
            this.onCraft && this.onCraft(selectedRecipe);
        };
        this.displayCard.onBackToListRequested = () => {
            SceneManager.getInstance().changeScene(SceneIds.Player_BonusCrafting);
        };
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        if (this.displayCard) {
            return this.displayCard.getDrawableObjects();
        }
        return this.displayList.getDrawableObjects();
    }

    public cleanup(): void {
        this.displayList?.cleanup();
        this.displayCard?.cleanup();
    }
    

    // Appelée pour afficher la carte d'une recette spécifique
    showCardForRecipe(recipe: CraftRecipe) {
        this.displayCard = new CraftingRecipeCard(recipe);
        this.displayCard.onCraftRequested = () => {
            this.onCraft && this.onCraft(recipe);
            this.showList(); // Retour à la liste après le crafting
        };
        this.displayCard.onBackToListRequested = () => {
            this.showList(); // Retour à la liste
        };
    }

    // Appelée pour revenir à l'affichage de la liste des recettes
    showList() {
        this.displayCard = null; // Enlève la carte de l'affichage
    }
}
