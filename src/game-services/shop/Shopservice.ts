import { GroundLineLevels } from "../../entities/ground-line/GroundLineLevels";
import { SkillLibrary } from "../../entities/models/skill-system/library/SkillLibrary";
import { SkillsIds } from "../../entities/models/skill-system/types/SkillsIds";
import { PlayerProfile } from "../player-profile/PlayerProfile";
import { defenseLineConfigurations } from "../walls/config/WallDefenseConfigurations";

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

    buyWallLevel(level: number): boolean {
        const playerProfile = PlayerProfile.getInstance();
        const currentLevel = playerProfile.getWalls().getLevel();
        const nextLevelConfig = defenseLineConfigurations[level];

        if (!nextLevelConfig) {
            console.error(`Wall level ${level} configuration does not exist.`);
            return false;
        }

        if (level <= currentLevel) {
            console.error("This wall level is already unlocked or not available for upgrade.");
            return false;
        }

        if (playerProfile.getExperience().getExperiencePoints() < nextLevelConfig.experienceCost) {
            console.error("Not enough experience points to buy this wall level.");
            return false;
        }

        playerProfile.getWalls().setLevel(level);
        playerProfile.getExperience().subtractExperiencePoints(nextLevelConfig.experienceCost);
        console.log(`Wall level ${level} has been purchased.`);
        return true;
    }

    buyGroundLineLevel(level: number): boolean {
        const playerProfile = PlayerProfile.getInstance();
        const currentLevel = playerProfile.getGroundLine().getLevel();
        const levelConfig = GroundLineLevels[level];
    
        // Vérifier si la configuration pour le niveau demandé existe
        if (!levelConfig) {
            console.error(`GroundLine level ${level} configuration does not exist.`);
            return false;
        }
    
        // Vérifier si le joueur essaie d'acheter un niveau inférieur ou égal à son niveau actuel
        if (level <= currentLevel) {
            console.error("This GroundLine level is already unlocked or not available for upgrade.");
            return false;
        }
    
        // Vérifier si le joueur a suffisamment de points d'expérience pour l'achat
        if (playerProfile.getExperience().getExperiencePoints() < levelConfig.experience_Cost) {
            console.error("Not enough experience points to buy this GroundLine level.");
            return false;
        }
    
        // Procéder à l'achat
        playerProfile.getGroundLine().setLevel(level);
        playerProfile.getExperience().subtractExperiencePoints(levelConfig.experience_Cost);
        console.log(`GroundLine level ${level} has been purchased.`);
        return true;
    }
}
