import { SkillLibrary } from "../../entities/models/skill-system/library/SkillLibrary";
import { SkillsIds } from "../../entities/models/skill-system/types/SkillsIds";
import { PlayerProfile } from "../player-profile/PlayerProfile";

export class ShopService {
    private static instance: ShopService;

    private constructor() {}

    public static getInstance(): ShopService {
        if (!this.instance) {
            this.instance = new ShopService();
        }
        return this.instance;
    }

    buySkill(skillId: SkillsIds): boolean {
        const playerProfile = PlayerProfile.getInstance();
        const skill = SkillLibrary.getSkillById(skillId);

        if (!skill) {
            console.error(`Skill with ID ${skillId} does not exist.`);
            return false;
        }

        if (playerProfile.getExperience().getExperiencePoints() < skill.experiencePointsCost) {
            console.error("Not enough experience points to buy this skill.");
            return false;
        }

        playerProfile.getSkills().addSkill(skillId);
        playerProfile.getExperience().subtractExperiencePoints(skill.experiencePointsCost);
        console.log(`Skill ${skill.name} has been purchased.`);
        return true;
    }
}
