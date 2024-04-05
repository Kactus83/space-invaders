import { GameEntity } from "../../GameEntity";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { ISkillCharacteristics } from "./ISkillCharacteristics";
import { SkillBonus } from "./bonus/SkillBonus";
import { ISkill } from "./skill/ISkill";

export class SkillSystem  extends BonusReceiverTemplate<SkillBonus> {
    private characteristics: ISkillCharacteristics;
    private owner: GameEntity;
    private skills: Map<string, ISkill> = new Map();
    private activeSkills: Map<string, ISkill> = new Map();
    

    constructor(owner: GameEntity, characteristics: ISkillCharacteristics) {
        super();
        this.owner = owner;
        this.characteristics = characteristics;
    }
    addSkill(skill: ISkill): void {
        this.skills.set(skill.id, skill);
    }

    useSkill(skillId: string): void {
        const skill = this.skills.get(skillId);
        if (skill && skill.isReady()) {
            skill.execute();
            skill.resetCooldown();
            this.activeSkills.set(skillId, skill);
        }
    }

    update(deltaTime: number): void {
        this.activeSkills.forEach((skill, id) => {
            if (!skill.isReady()) {
                this.activeSkills.delete(id);
            }
            skill.update(deltaTime);
        });
    }

    isSkillActive(skillId: string): boolean {
        return this.activeSkills.has(skillId);
    }
}
