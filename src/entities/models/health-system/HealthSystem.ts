import { GameEntity } from "../../GameEntity";
import { HealthState } from "../../types/HealthState";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { HealthBonus } from "./bonus/HealthBonus";
import { IHealthCharacteristics } from "./IHealthCharasteristics";
import { Player } from "../../player/Player";
import { SkillsIds } from "../skill-system/types/SkillsIds";
import { Invader } from "../../invader/Invader";

export class HealthSystem extends BonusReceiverTemplate<HealthBonus> {
    healthState: HealthState = HealthState.New;
    private characteristics: IHealthCharacteristics;
    private maxHP: number;
    private owner: GameEntity;

    constructor(owner: GameEntity, characteristics: IHealthCharacteristics) {
        super();
        this.owner = owner;
        this.characteristics = JSON.parse(JSON.stringify(characteristics));
        this.maxHP = characteristics.hp;
    }

    public updateCharacteristics(newCharacteristics: IHealthCharacteristics): void {
        this.characteristics = JSON.parse(JSON.stringify(newCharacteristics));
        this.maxHP = newCharacteristics.hp;
    }    
    
    update(deltaTime: number): void {
        // Vérifier si le skill de soin est actif et appliquer le soin
        if (this.owner instanceof Player && this.owner.skillSystem.isSkillActive(SkillsIds.Heal)) {
            this.applyHealEffect(SkillsIds.Heal);
            // Désactiver le skill de soin après l'application
            this.owner.skillSystem.deactivateSkill(SkillsIds.Heal);
        }
    }

    private applyHealEffect(skillId: SkillsIds): void {
        switch (skillId) {
            case SkillsIds.Heal:
                // Applique un soin de 50% des HP max
                const healAmount = this.maxHP * 0.5;
                this.heal(healAmount);
                break;
            // Ajoutez des cas supplémentaires ici pour d'autres types de soins
            default:
                console.error(`Unknown heal skill ID: ${skillId}`);
        }
    }

    public takeDamage(amount: number): void {
        let effectiveDamage = amount - this.shield;
        effectiveDamage = effectiveDamage > 0 ? effectiveDamage : 0; // Ensure damage isn't negative due to shield

        this.characteristics.hp -= effectiveDamage;

        if(this.owner instanceof Player || this.owner instanceof Invader) {
            if(effectiveDamage > 0 && this.characteristics.hp > 0 && this.owner instanceof Invader) {
                this.owner.animationSystem.startHitAnimation();
            }else if(amount > 0 && effectiveDamage === 0 && this.owner instanceof Player) {
                this.owner.animationSystem.startShieldAnimation();
            }
        }

        if (this.health < this.maxHP * 0.3) {
            this.healthState = HealthState.Critical;
            this.owner.shouldUpdateDesign = true;
        } else if (this.characteristics.hp < this.maxHP * 0.6) { 
            this.healthState = HealthState.Damaged;
            this.owner.shouldUpdateDesign = true;
        }
    }

    public heal(amount: number): void {
        if(amount > 0 && (this.owner instanceof Player || this.owner instanceof Invader)) {
            this.owner.animationSystem.startHealAnimation();
        }
        // Calcul du nouveau total de HP après le soin
        let newHp = this.characteristics.hp + amount;
        // Assurer que les HP ne dépassent pas le maximum autorisé
        if (newHp > this.maxHP) {
            newHp = this.maxHP;
        }
        // Appliquer le nouveau total de HP
        this.characteristics.hp = newHp;
    }

    public onCollision(other: HealthSystem): void {
        this.takeDamage(other.characteristics.damage);
    }    

    public get health(): number {
        let result = this.characteristics.hp;
        if (this.currentBonus) {
            result += this.currentBonus.getEffect().additional_Hp;
            result *= this.currentBonus.getEffect().multiplicator_Hp;
        }
        return result;
    }

    public get shield(): number {
        let result = this.characteristics.shield;
        if (this.currentBonus) {
            result += this.currentBonus.getEffect().additional_Shield;
            result *= this.currentBonus.getEffect().multiplicator_Shield;
        }
        return result;
    }

    public get damage(): number {
        let result = this.characteristics.damage;
        if (this.currentBonus) {
            result += this.currentBonus.getEffect().additional_Damage;
            result *= this.currentBonus.getEffect().multiplicator_Damage;
        }
        return result;
    }

    public get regenerationRate(): number {
        let result = this.characteristics.regenerationRate;
        if (this.currentBonus) {
            result += this.currentBonus.getEffect().additional_RegenerationRate;
            result *= this.currentBonus.getEffect().multiplicator_RegenerationRate;
        }
        return result;
    }
}
