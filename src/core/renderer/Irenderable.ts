import { fabric } from "fabric";

export interface IRenderable {
    getDrawableObjects(): Promise<fabric.Object[]>;
}
