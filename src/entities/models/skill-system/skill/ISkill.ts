export interface ISkill {
    id: string;
    name: string;
    description: string;
    execute(): void;
    update(deltaTime: number): void;
    isReady(): boolean;
    resetCooldown(): void;
}
