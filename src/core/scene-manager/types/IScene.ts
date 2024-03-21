import { IRenderable } from "../../renderer/Irenderable";

export interface IScene {
    initialize(): Promise<void>;
    update(deltaTime: number): void;
    getDrawableObjects(): IRenderable[];
    cleanup(): void;
}
