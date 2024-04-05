export interface ISkill {
    id: string;
    name: string;
    description: string;
    cooldown: number;
    execute(): void;
}
