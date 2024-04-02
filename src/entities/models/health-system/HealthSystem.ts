import { GameEntity } from "../../GameEntity";
import { HealthState } from "../../types/HealthState";
import { SystemBonusEffectType } from "../bonus-system/system-bonus/SystemBonusEffectType";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { HealthBonus } from "./bonus/HealthBonus";
import { HealthBonusEffect } from "./bonus/HealthBonusEffect";
import { IHealthCharacteristics } from "./IHealthCharasteristics";

export class HealthSystem  extends BonusReceiverTemplate<HealthBonus> {
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

    public takeDamage(amount: number): void {
        let effectiveDamage = amount - this.shield;
        effectiveDamage = effectiveDamage > 0 ? effectiveDamage : 0; // Ensure damage isn't negative due to shield

        this.characteristics.hp -= effectiveDamage;

        if (this.health < this.maxHP * 0.3) {
            this.healthState = HealthState.Critical;
            this.owner.shouldUpdateDesign = true;
        } else if (this.characteristics.hp < this.maxHP * 0.6) { 
            this.healthState = HealthState.Damaged;
            this.owner.shouldUpdateDesign = true;
        }
    }

    public heal(amount: number): void {
        this.characteristics.hp += amount;
        // Ensure HP does not exceed some maximum value, if applicable
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
