export interface ISkill {
    id: string;
    name: string;
    description: string;
    isPermanent: boolean;
    experiencePointsCost: number;
    isActive: boolean;
    activate(): void;
    update(deltaTime: number): void;
}