import { GameEntity } from "../../GameEntity";
import { ISpeedCharacteristics } from "./ISpeedCharacteristics";

export class SpeedSystem {
    private characteristics: ISpeedCharacteristics;
    private owner: GameEntity;

    constructor(owner: GameEntity, characteristics: ISpeedCharacteristics) {
        this.owner = owner;
        this.characteristics = characteristics;
    }

    public updateCharacteristics(newCharacteristics: ISpeedCharacteristics): void {
        this.characteristics = newCharacteristics;
    }

    public get moveSpeed(): number {
        return this.characteristics.moveSpeed;
    }

    public applySpeedBonus(bonusValue: number): void {
        this.characteristics.moveSpeed += bonusValue;
    }

    public applySpeedMalus(malusValue: number): void {
        this.characteristics.moveSpeed = Math.max(0, this.characteristics.moveSpeed - malusValue);
    }
}
