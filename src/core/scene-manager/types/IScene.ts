export interface IScene {
    initialize(): Promise<void>;
    update(deltaTime: number): void;
    getDrawableObjects(): fabric.Object[];
    cleanup(): void;
}
