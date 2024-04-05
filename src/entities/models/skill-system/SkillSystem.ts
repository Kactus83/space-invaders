import { GameEntity } from "../../GameEntity";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { SkillBonus } from "./bonus/SkillBonus";
import { ISkillCharacteristics } from "./ISkillCharacteristics";

export class SkillSystem extends BonusReceiverTemplate<SkillBonus> {
    private characteristics: ISkillCharacteristics;
    private owner: GameEntity;

    constructor(owner: GameEntity, characteristics: ISkillCharacteristics) {
        super();
        this.owner = owner;
        this.characteristics = characteristics;
    }

    public updateCharacteristics(newCharacteristics: ISkillCharacteristics): void {
        this.characteristics = newCharacteristics;
    }

    public useSkill(): void {
        // Logic to use a skill, considering cooldownRatio
        console.log(`Using skill with cooldown ratio: ${this.getCooldownRatio()}`);
    }

    public getCooldownRatio(): number {
        let cooldownRatio = this.characteristics.cooldownRatio;
        if (this.currentBonus) {
            const effect = this.currentBonus.getEffect();
            cooldownRatio *= effect.multiplicator_CooldownRatio;
            cooldownRatio += effect.additional_CooldownRatio;
        }
        return cooldownRatio;
    }
}
