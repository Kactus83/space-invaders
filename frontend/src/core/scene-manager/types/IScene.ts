import { IRenderable } from "../../renderer/Irenderable";
 
/**
 * Interface for Game scenes that will be processed by scene manager
 */
export interface IScene {
    initialize(): Promise<void>;
    update(deltaTime: number): void;
    getDrawableObjects(): IRenderable[];
    cleanup(): void;
}
