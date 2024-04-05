export interface ISkill {
    id: string;
    name: string;
    description: string;
    isPermanent: boolean;
    isActive(): boolean;
    activate(): void;
    update(deltaTime: number): void;
}