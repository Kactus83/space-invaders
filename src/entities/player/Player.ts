import { IInteractive } from "../../core/input-manager/IInteractive";
import { UserInputType } from "../../core/input-manager/UserInputType";
import { GameEntity } from "../GameEntity";

export class Player extends GameEntity implements IInteractive {
    public entityType = this;

    constructor() {
        super();
        // Initialisation du fabricObject à venir
    }

    onCollisionWith(entity: GameEntity): void {
        // Logique de collision spécifique au joueur
    }

    handleInput(inputType: UserInputType): void {
        // Logique de gestion des inputs
    }

    // Méthodes spécifiques au joueur...
}
