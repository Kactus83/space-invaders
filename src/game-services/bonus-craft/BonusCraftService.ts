import { PlayerProfile } from '../player-profile/PlayerProfile';
import { GameBonusType } from '../../entities/bonus/GameBonusTypes';
import { CraftRecipe } from './library/CraftRecipe';
import { craftRecipes } from './library/CraftRecipes';

export class CraftService {
    private static instance: CraftService;
    private playerProfile: PlayerProfile;

    private constructor() {
        this.playerProfile = PlayerProfile.getInstance();
    }

    public static getInstance(): CraftService {
        if (!CraftService.instance) {
            CraftService.instance = new CraftService();
        }
        return CraftService.instance;
    }

    public craftBonus(bonusIdsToCraft: GameBonusType[]): GameBonusType | null {
        const recipe = this.findMatchingRecipe(bonusIdsToCraft);
        if (!recipe) return null;

        // Conversion SystemBonus[] en GameBonusType[]
        const playerBonusesTypes = this.playerProfile.getInventory().getAllBonus().map(bonus => bonus.effect.name);

        if (this.canCraft(recipe, playerBonusesTypes)) {
            this.executeCraft(recipe);
            return recipe.resultBonus;
        }

        return null;
    }

    private findMatchingRecipe(bonusIdsToCraft: GameBonusType[]): CraftRecipe | null {
        return craftRecipes.find(recipe =>
            recipe.requiredBonuses.sort().toString() === bonusIdsToCraft.sort().toString()
        );
    }

    private canCraft(recipe: CraftRecipe, playerBonusesTypes: GameBonusType[]): boolean {
        return recipe.requiredBonuses.every(bonusType => playerBonusesTypes.includes(bonusType));
    }

    private executeCraft(recipe: CraftRecipe): void {
        // Suppression des bonus utilisés dans l'inventaire
        recipe.requiredBonuses.forEach(bonusType => {
            this.playerProfile.getInventory().removeBonusByType(bonusType);
        });

        // Ajout du bonus résultant à l'inventaire
        this.playerProfile.getInventory().addBonusByType(recipe.resultBonus);
    }
}
