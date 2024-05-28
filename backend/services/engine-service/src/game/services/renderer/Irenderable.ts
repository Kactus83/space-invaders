import { fabric } from "fabric";

/**
 * Interface for renderable objects that can be drawn on the canvas by renderer.
 */
export interface IRenderable {
    getDrawableObjects(): Promise<fabric.Object[]>;
}
