import { GameEntity } from "../GameEntity";
import { SkillSystem } from "../models/skill-system/SkillSystem";
import { IInvaderBossCharacteristics } from "./IInvaderBossCharacteristics";

export abstract class InvaderBoss extends GameEntity {
    protected characteristics: IInvaderBossCharacteristics;
    protected skillSystem: SkillSystem;

    constructor(characteristics: IInvaderBossCharacteristics, initialPosition: { x: number, y: number }) {
        super();
        this.characteristics = characteristics;
        this.skillSystem = new SkillSystem(this, characteristics);
        // Initialiser les autres systèmes ici
    }

    // Fonction pour charger le design spécifique au Boss
    protected abstract loadDesign(): Promise<void>;

    // Fonctions abstraites pour définir le comportement unique du Boss
    public abstract update(deltaTime: number): void;
    public abstract onCollisionWith(entity: GameEntity): void;
}