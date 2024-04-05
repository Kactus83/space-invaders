import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { IScene } from "../../core/scene-manager/types/IScene";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { craftRecipes } from "../../game-services/bonus-craft/library/CraftRecipes";
import { CraftingRecipeDisplay } from "../../ui/crafting-recipe-display/CraftingRecipeDisplay";
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";

export class BonusCraftingScene implements IScene {
    private menu: HorizontalMenu;
    private craftingDisplay: CraftingRecipeDisplay;

    async initialize(): Promise<void> {
        const recipes = craftRecipes; // Obtenez les recettes disponibles pour le craft
        this.craftingDisplay = new CraftingRecipeDisplay(recipes);

        // Initialisation du menu horizontal pour la navigation
        this.menu = new HorizontalMenu(["Retour"], [() => SceneManager.getInstance().changeScene(SceneIds.Player_Inventory)]);
    }

    update(deltaTime: number): void {
        // Logique de mise à jour si nécessaire
    }

    getDrawableObjects(): IRenderable[] {
        // Renvoie les objets à dessiner, à la fois du menu et du display de crafting
        return [this.menu, this.craftingDisplay];
    }

    cleanup(): void {
        this.menu.cleanup();
    }
}
