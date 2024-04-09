import { SkillLibrary } from "../../../entities/models/skill-system/library/SkillLibrary";
import { ISkill } from "../../../entities/models/skill-system/skill/ISkill";
import { SkillsIds } from "../../../entities/models/skill-system/types/SkillsIds";
import { PlayerProfile } from "../PlayerProfile";
import { PlayerDataService } from "../datas/PlayerDataService";

export class PlayerSkills {
    private skills: Set<SkillsIds>;
    private activeSkills: SkillsIds[] = [];
    private playerProfile: PlayerProfile;

    constructor(playerProfile: PlayerProfile) {
        this.playerProfile = playerProfile;
        this.skills = new Set();
        this.restoreFromData();
    }

    addSkill(skillId: SkillsIds): void {
        this.skills.add(skillId);
        PlayerDataService.getInstance().saveCurrentProfile(this.playerProfile);
    }

    removeSkill(skillId: SkillsIds): void {
        this.skills.delete(skillId);
        PlayerDataService.getInstance().saveCurrentProfile(this.playerProfile);
    }

    getSkills(): ISkill[] {
        // Assurez-vous que SkillLibrary.getSkillById retourne bien une instance implémentant ISkill ou null
        return Array.from(this.skills).map(id => SkillLibrary.getSkillById(id)).filter(skill => skill !== null) as ISkill[];
    }

    getSkillsIds(): SkillsIds[] {
        // Retourne un tableau des identifiants de compétences
        return Array.from(this.skills);
    }

    getActiveSkillsIds(): SkillsIds[] {
        return this.activeSkills;
    }

    hasSkill(skillId: SkillsIds): boolean {
        return this.skills.has(skillId);
    }

    setActiveSkills(skillIds: SkillsIds[]): void {
        this.activeSkills = skillIds.slice(0, 10); // Garantit un taille de 10 éléments maximum
        PlayerDataService.getInstance().saveCurrentProfile(this.playerProfile);
    }

    // Méthode pour obtenir les compétences actives
    getActiveSkills(): ISkill[] {
        return this.activeSkills.map(id => SkillLibrary.getSkillById(id)).filter(skill => skill !== null) as ISkill[];
    }

    restoreFromData(): void {
        const profileData = PlayerDataService.getInstance().loadCurrentProfile(this.playerProfile.getPlayerName());
        
        if (profileData && profileData.skills && Array.isArray(profileData.skills.skillIds)) {
            const skillsIds: SkillsIds[] = profileData.skills.skillIds;
            // Créer un nouveau Set avec les identifiants de compétences chargés
            this.skills = new Set(skillsIds);
        } else {
            // Si les données n'existent pas, initialiser simplement le Set sans identifiants
            this.skills = new Set();
            console.log("No skills data available to restore, or the data format is outdated.");
        }
    }
}
