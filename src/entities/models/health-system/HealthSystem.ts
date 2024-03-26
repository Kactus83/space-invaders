import { GameEntity } from "../../GameEntity";
import { HealthState } from "../../types/HealthState";
import { IHealthCharacteristics } from "./IHealthCharasteristics";

export class HealthSystem {
    healthState: HealthState = HealthState.New;
    private characteristics: IHealthCharacteristics;
    private owner: GameEntity;

    constructor(owner: GameEntity, characteristics: IHealthCharacteristics) {
        this.owner = owner;
        this.characteristics = characteristics;
    }

    public updateCharacteristics(newCharacteristics: IHealthCharacteristics): void {
        this.characteristics = newCharacteristics;
    }

    public takeDamage(amount: number): void {
        let effectiveDamage = amount - this.characteristics.shield;
        effectiveDamage = effectiveDamage > 0 ? effectiveDamage : 0; // Ensure damage isn't negative due to shield

        this.characteristics.hp -= effectiveDamage;

        if (this.characteristics.hp < this.characteristics.hp * 0.3) {
            this.healthState = HealthState.Critical;
        } else if (this.characteristics.hp < this.characteristics.hp * 0.6) { 
            this.healthState = HealthState.Damaged;
        }
    }

    public heal(amount: number): void {
        this.characteristics.hp += amount;
        // Ensure HP does not exceed some maximum value, if applicable
    }

    public onCollision(other: HealthSystem): void {
        // Example collision handling, could take damage based on the other's damage
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
