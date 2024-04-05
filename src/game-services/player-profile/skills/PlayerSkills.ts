import { ISkill } from "../../../entities/models/skill-system/skill/ISkill";
import { SkillsIds } from "../../../entities/models/skill-system/types/SkillsIds";
import { PlayerProfile } from "../PlayerProfile";
import { PlayerDataService } from "../datas/PlayerDataService";

export class PlayerSkills {
    private skills: Set<SkillsIds>; // Utiliser SkillsIds pour typer le Set
    private playerProfile: PlayerProfile;

    constructor(playerProfile: PlayerProfile) {
        this.playerProfile = playerProfile;
        this.skills = new Set();
        this.restoreFromData();
    }

    addSkill(skillId: SkillsIds): void {
        this.skills.add(skillId);
    }

    removeSkill(skillId: SkillsIds): void {
        this.skills.delete(skillId);
    }

    getSkills(): ISkill[] {
        // Assurez-vous que SkillLibrary.getSkillById retourne bien une instance implémentant ISkill ou null
        return Array.from(this.skills).map(id => SkillLibrary.getSkillById(id)).filter(skill => skill !== null) as ISkill[];
    }

    getSkillsIds(): SkillsIds[] {
        // Retourne un tableau des identifiants de compétences
        return Array.from(this.skills);
    }

    hasSkill(skillId: SkillsIds): boolean {
        return this.skills.has(skillId);
    }

    restoreFromData(): void {
        const skillsIds: SkillsIds[] = PlayerDataService.getInstance().loadCurrentProfile(this.playerProfile.getPlayerName())?.skills.skillIds;
        if (skillsIds) {
            this.skills = new Set(skillsIds);
        }
    }
}
