import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { CraftingRecipeDisplay } from "../../ui/crafting-recipe-display/CraftingRecipeDisplay";
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";
import { CraftService } from "../../game-services/bonus-craft/BonusCraftService";
import { CraftRecipe } from "../../game-services/bonus-craft/library/CraftRecipe";

export class BonusCraftingScene implements IScene {
    private menu: HorizontalMenu;
    private craftingDisplay: CraftingRecipeDisplay;
    private mode: 'list' | 'card' = 'list'; // Ajout de l'état du mode


    async initialize(): Promise<void> {
        this.craftingDisplay = new CraftingRecipeDisplay();
        this.craftingDisplay.onCraft = this.handleCraft.bind(this);

        // Lorsqu'une recette est sélectionnée, affichez la carte
        this.craftingDisplay.onRecipeSelected = (recipe) => {
            console.log('Recipe selected', recipe);
            this.mode = 'card';
            this.craftingDisplay.showCardForRecipe(recipe); 
        };

        // Pour revenir à la liste des recettes
        this.craftingDisplay.onBackToListRequested = () => {
            console.log('Back to list requested');
            this.mode = 'list';
            this.craftingDisplay.showList(); 
        };

        this.menu = new HorizontalMenu(["Retour"], [() => SceneManager.getInstance().changeScene(SceneIds.Player_Inventory)]);
    }

    private handleCraft(recipe: CraftRecipe): void {

        const result = CraftService.getInstance().craftBonus(recipe.requiredBonuses);
        if (result) {
            alert('Crafting successful');
            this.mode = 'list'; // Revenir à la liste après le craft
        } else {
            alert('Crafting failed');
        }
    }

    update(deltaTime: number): void {
        // Gérer ici la logique de mise à jour spécifique au mode si nécessaire
    }

    getDrawableObjects(): IRenderable[] {
        return [this.menu, this.craftingDisplay];
    }

    cleanup(): void {
        this.menu.cleanup();
        this.craftingDisplay.cleanup();
    }
}
