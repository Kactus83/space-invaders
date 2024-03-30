import { GameEntity } from "../../GameEntity";
import { Projectile } from "../../projectile/Projectile";
import { HealthState } from "../../types/HealthState";
import { IHealthCharacteristics } from "./IHealthCharasteristics";

export class HealthSystem {
    healthState: HealthState = HealthState.New;
    private characteristics: IHealthCharacteristics;
    private maxHP: number;
    private owner: GameEntity;

    constructor(owner: GameEntity, characteristics: IHealthCharacteristics) {
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

        if (this.characteristics.hp < this.maxHP * 0.3) {
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
        return this.characteristics.hp;
    }

    public get shield(): number {
        return this.characteristics.shield;
    }

    public get damage(): number {
        return this.characteristics.damage;
    }

    public get regenerationRate(): number {
        return this.characteristics.regenerationRate;
    }
}
