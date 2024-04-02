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
        let effectiveDamage = amount - this.characteristics.shield;
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
        return this.applyBonusToCharacteristic(this.characteristics.hp, 'hp');
    }

    public get shield(): number {
        return this.applyBonusToCharacteristic(this.characteristics.shield, 'shield');
    }

    public get damage(): number {
        return this.applyBonusToCharacteristic(this.characteristics.damage, 'damage');
    }

    public get regenerationRate(): number {
        return this.applyBonusToCharacteristic(this.characteristics.regenerationRate, 'regenerationRate');
    }

        // Ajustement des méthodes pour appliquer les bonus
    private applyBonusToCharacteristic(characteristicValue: number, characteristic: keyof IHealthCharacteristics): number {
        let value = characteristicValue;

        // Appliquer l'effet de bonus permanent s'il y en a un
        if (this.currentBonus?.effect) {
            const effect = this.currentBonus.effect as HealthBonusEffect;
            value = this.applyEffect(value, effect, characteristic);
        }

        return value;
    }

    // Nouvelle méthode pour appliquer un effet spécifique basé sur la caractéristique
    private applyEffect(value: number, effect: HealthBonusEffect, characteristic: keyof IHealthCharacteristics): number {
        const effectValue = effect[characteristic];
        if (effect.effectType === SystemBonusEffectType.Additive) {
            return value + effectValue;
        } else if (effect.effectType === SystemBonusEffectType.Multiplicative) {
            return value * effectValue;
        }
        return value; // Cas par défaut si aucun effet n'est applicable
    }

}
