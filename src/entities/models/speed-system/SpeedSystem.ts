import { GameEntity } from "../../GameEntity";
import { Player } from "../../player/Player";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { SkillsIds } from "../skill-system/types/SkillsIds";
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
        // Commencez par la vitesse de base
        let effectiveMoveSpeed = this.characteristics.moveSpeed;

        // Si un bonus est actif, appliquez son effet
        if (this.currentBonus) {
            const effect = this.currentBonus.getEffect();
            // Appliquez d'abord les modifications additives
            effectiveMoveSpeed += effect.additional_MoveSpeed;
            // Ensuite, appliquez les multiplicateurs
            effectiveMoveSpeed *= effect.multiplicator_MoveSpeed;
        }

        if (this.owner instanceof Player && this.owner.skillSystem.isSkillActive(SkillsIds.SpeedBoost)) {
            effectiveMoveSpeed *= 2;
        }

        return effectiveMoveSpeed;
    }
}
