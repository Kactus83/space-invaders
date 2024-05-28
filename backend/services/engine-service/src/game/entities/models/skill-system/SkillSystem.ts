import { PlayerProfile } from "../../../services/player-profile/PlayerProfile";
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

    getSkills(): Skill[] {
        return this.skills;
    }

    loadSkillsFromProfile(): void {
        const playerProfile = PlayerProfile.getInstance();
        const playerSkills = playerProfile.getSkills().getActiveSkillsIds();

        playerSkills.forEach(skillId => {
            const skill = SkillLibrary.getSkillById(skillId);
            if (skill) {
                this.addSkill(skill);
            }
        });
    }

    addSkill(skill: Skill): void {
        // Si la compétence a un cooldown, ajustez lastActivationTime pour simuler que le cooldown est terminé
        if (!skill.isPermanent && skill.cooldown > 0) {
            skill.lastActivationTime = Date.now() - skill.cooldown;
        }
        
        this.skills.push(skill);
        
        if (skill.isPermanent) {
            skill.activate(); // Activez immédiatement les compétences permanentes
        }
    }    

    useSkill(skillId: string): void {
        this.owner.animationSystem.startSkillAnimation();
        const skill = this.skills.find(s => s.id === skillId);
        if (skill && skill.isReady()) {
            skill.activate();
        }
    }

    activateSkillByIndex(index: number): void {
        this.owner.animationSystem.startSkillAnimation();
        if (index >= 0 && index < this.skills.length) {
            const skill = this.skills[index];
            skill.activate();
        } else {
            console.log(`SkillSystem: No skill found at index ${index}`);
        }
    }

    update(deltaTime: number): void {
        this.skills.forEach(skill => skill.update(deltaTime));
    }

    isSkillActive(skillId: string): boolean {
        const skill = this.skills.find(s => s.id === skillId);
        return !!skill && skill.isActive;
    }

    deactivateSkill(skillId: string): void {
        const skill = this.skills.find(s => s.id === skillId);
        if (skill) {
            skill.deactivate();
        }
    }
}