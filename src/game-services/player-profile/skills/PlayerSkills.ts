import { SkillLibrary } from "../../../entities/models/skill-system/library/SkillLibrary";
import { ISkill } from "../../../entities/models/skill-system/skill/ISkill";
import { PlayerProfile } from "../PlayerProfile";
import { PlayerDataService } from "../datas/PlayerDataService";

export class PlayerSkills {
    private skills: Set<string>; 
    private playerProfile: PlayerProfile;

    constructor(playerProfile: PlayerProfile) {
        this.playerProfile = playerProfile;
        this.skills = new Set();
    }

    addSkill(skillId: string): void {
        this.skills.add(skillId);
    }

    removeSkill(skillId: string): void {
        this.skills.delete(skillId);
    }

    getSkills(): ISkill[] {
        return Array.from(this.skills).map(id => SkillLibrary.getSkillById(id)).filter(skill => skill !== null) as ISkill[];
    }

    hasSkill(skillId: string): boolean {
        return this.skills.has(skillId);
    }

    // Utilisé pour la restauration à partir des données sauvegardées
    restoreFromData(): void {
        const skillsIds = PlayerDataService.getInstance().loadCurrentProfile(this.playerProfile.getPlayerName())?.skills;
        this.skills = new Set(skillsIds);
    }
}
