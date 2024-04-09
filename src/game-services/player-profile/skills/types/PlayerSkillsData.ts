import { SkillsIds } from "../../../../entities/models/skill-system/types/SkillsIds";

export interface PlayerSkillsData {
    skillIds: SkillsIds[];
    activeSkills: SkillsIds[];
}
