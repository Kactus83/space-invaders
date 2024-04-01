import { GameEntity } from "../../GameEntity";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { ISpeedCharacteristics } from "./ISpeedCharacteristics";
import { SpeedBonus } from "./bonus/SpeedBonus";

export class SpeedSystem extends BonusReceiverTemplate<SpeedBonus> {
    private characteristics: ISpeedCharacteristics;
    private owner: GameEntity;

    constructor(owner: GameEntity, characteristics: ISpeedCharacteristics) {
        super();
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
