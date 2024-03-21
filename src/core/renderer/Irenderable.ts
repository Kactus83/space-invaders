import { fabric } from "fabric";

export interface IRenderable {
    getDrawableObjects(): fabric.Object[];
}
