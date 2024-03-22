import { GameEntity } from "../GameEntity";

export class Invader extends GameEntity {
    public entityType = this;

    constructor() {
        super();
        // Initialisation du fabricObject à venir
    }

    onCollisionWith(entity: GameEntity): void {
        // Logique de collision spécifique au joueur
    }

    // Méthodes spécifiques au joueur...
}
