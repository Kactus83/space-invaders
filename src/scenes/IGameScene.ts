import { UserInputType } from '../inputs/UserInputType';

export interface IGameScene {
    initialize(): void;
    handleInput(input: UserInputType): void;
    update(deltaTime: number): void;
    render(): void;
    cleanup(): void;
}