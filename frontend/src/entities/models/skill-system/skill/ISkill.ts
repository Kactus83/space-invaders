import { SkillsIds } from "../types/SkillsIds";

export interface ISkill {
    id: SkillsIds;
    name: string;
    description: string;
    isPermanent: boolean;
    experiencePointsCost: number;
    isActive: boolean;
    parentSkillId?: SkillsIds;
    activate(): void;
    update(deltaTime: number): void;
}