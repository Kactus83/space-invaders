import { UserInputType } from '../inputs/UserInputType';

export interface IGameScene {
    isInitialized: boolean;
    initialize(): Promise<void>;
    handleInput(input: UserInputType): void;
    update(deltaTime: number): void;
    render(): void;
    cleanup(): void;
}