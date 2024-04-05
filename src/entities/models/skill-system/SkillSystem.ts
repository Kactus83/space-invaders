import { PlayerProfile } from "../../../game-services/player-profile/PlayerProfile";
import { GameEntity } from "../../GameEntity";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { ISkillCharacteristics } from "./ISkillCharacteristics";
import { SkillBonus } from "./bonus/SkillBonus";
import { SkillLibrary } from "./library/SkillLibrary";
import { Skill } from "./skill/Skill";

export class SkillSystem extends BonusReceiverTemplate<SkillBonus>{
    private characteristics: ISkillCharacteristics;
    private owner: GameEntity;
    private skills: Skill[] = [];
    private activeSkills: string[] = [];

    constructor(owner: GameEntity, characteristics: ISkillCharacteristics) {
        super();
        this.owner = owner;
        this.characteristics = JSON.parse(JSON.stringify(characteristics));
        this.loadSkillsFromProfile();
    }

    loadSkillsFromProfile(): void {
        const playerProfile = PlayerProfile.getInstance();
        const playerSkills = playerProfile.getSkills().getSkillsIds();

        playerSkills.forEach(skillId => {
            const skill = SkillLibrary.getSkillById(skillId);
            if (skill) {
                this.addSkill(skill);
            }
        });
    }

    addSkill(skill: Skill): void {
        this.skills.push(skill);
        if (skill.isPermanent) {
            skill.activate(); // Activer immédiatement les compétences permanentes
        }
    }

    useSkill(skillId: string): void {
        const skill = this.skills.find(s => s.id === skillId);
        if (skill && skill.isReady()) {
            skill.activate();
        }
    }

    update(deltaTime: number): void {
        this.skills.forEach(skill => skill.update(deltaTime));
    }

    isSkillActive(skillId: string): boolean {
        const skill = this.skills.find(s => s.id === skillId);
        return skill ? skill.isActive() : false;
    }

    deactivateSkill(skillId: string): void {
        const skill = this.skills.find(s => s.id === skillId);
        if (skill) {
            skill.deactivate();
        }
    }
}