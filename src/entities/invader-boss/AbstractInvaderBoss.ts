import { GameEntity } from "../GameEntity";
import { BonusEmitterSystem } from "../models/bonus-system/bonus-emitter/BonusEmitterSystem";
import { HealthSystem } from "../models/health-system/HealthSystem";
import { SkillSystem } from "../models/skill-system/SkillSystem";
import { SpeedSystem } from "../models/speed-system/SpeedSystem";
import { WeaponSystem } from "../models/weapon-system/WeaponSystem";
import { IInvaderBossCharacteristics } from "./IInvaderBossCharacteristics";

export abstract class InvaderBoss extends GameEntity {
    protected characteristics: IInvaderBossCharacteristics;
    protected speedSystem: SpeedSystem;
    protected healthSystem: HealthSystem;
    protected weaponSystem: WeaponSystem;
    protected bonusEmitterSystem: BonusEmitterSystem;
    protected skillSystem: SkillSystem;

    constructor(characteristics: IInvaderBossCharacteristics, initialPosition: { x: number, y: number }) {
        super();
        this.characteristics = characteristics;
        this.speedSystem = new SpeedSystem(this, characteristics);
        this.healthSystem = new HealthSystem(this, characteristics);
        this.weaponSystem = new WeaponSystem(this, characteristics);
        this.bonusEmitterSystem = new BonusEmitterSystem(this, characteristics);
        this.skillSystem = new SkillSystem(this, characteristics);
        // Position initiale du boss
        this.fabricObject?.set({
            left: initialPosition.x,
            top: initialPosition.y
        });
    }

    // Fonction pour charger le design spécifique au Boss
    protected abstract loadDesign(): Promise<void>;

    // Fonctions abstraites pour définir le comportement unique du Boss
    public abstract update(deltaTime: number): void;
    public abstract onCollisionWith(entity: GameEntity): void;
}