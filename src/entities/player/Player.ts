import { IInteractive } from "../../core/input-manager/IInteractive";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { GameEntity } from "../GameEntity";
import { Invader } from "../invader/Invader";
import { Projectile } from "../projectile/Projectile";
import { ProjectileType } from "../projectile/ProjectileType";
import { Wall } from "../wall/Wall";
import { PlayerLevels } from "./PlayerLevels";

export class Player extends GameEntity implements IInteractive {
    private level: number = 1;
    private hp: number = 3; 
    private score: number = 0;

    constructor() {
        super();
        // Initialisation spécifique du joueur à venir ici
    }
    
    protected async loadDesign(): Promise<void> {
        const design = this.themeManager.getTheme().getPlayerDesign(this.level);
        this.fabricObject = await this.createFabricObject(design);
    }

    onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            // Logique de collision avec les joueurs
        } else if (entity instanceof Projectile) {
            // Logique de collision avec les projectiles
        } else if (entity instanceof Wall) {
            // Logique de collision avec les murs
        } else if (entity instanceof Invader) {
            // Logique de collision avec les autres invaders
        } else {
            throw new Error("Unknown entity type");
        }
    }

    handleInput(inputType: UserInputType): void {
        // Implémentez votre logique de gestion des inputs ici
        switch (inputType) {
            case UserInputType.Left:
                // Déplacer le joueur vers la gauche
                break;
            case UserInputType.Right:
                // Déplacer le joueur vers la droite
                break;
            case UserInputType.Shoot:
                // Le joueur tire un projectile
                break;
            // Ajoutez plus de cas si nécessaire
        }
    }

    private updateLevel(): void {
        // Mettez à jour le niveau du joueur en fonction du score
        for (let level in PlayerLevels) {
            if (this.score >= PlayerLevels[level].scoreThreshold) {
                this.level = parseInt(level);
                // Appliquez les changements de niveau ici (par exemple, augmentez le taux de tir, etc.)
            }
        }
    }

    public increaseScore(amount: number): void {
        this.score += amount;
        this.updateLevel();
    }

    // Ajoutez d'autres méthodes spécifiques au joueur si nécessaire

    // Définissez getDrawableObjects() et d'autres méthodes abstraites si nécessaire
}

// Vous devrez également adapter PlayerLevels et d'autres constantes/configurations en fonction de vos besoins
