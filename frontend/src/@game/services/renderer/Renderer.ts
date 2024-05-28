import { fabric } from "fabric";
import { IGlobalConfig } from "../../config/IGlobalConfig";
import { IRenderable } from "./Irenderable";
import { AppConfig } from "../../config/AppConfig";

/**
 * The Renderer class is responsible for rendering game objects on a canvas using the Fabric.js library.
 */
export class Renderer {

    // Canvas
    private fabricCanvas: fabric.Canvas;

    // Config
    private config: IGlobalConfig;

    /**
     * Constructor for the Renderer class.
     */
    constructor() {
        this.config = AppConfig.getInstance();
    }

    /**
     * Initialize the Fabric Canvas with the given canvas element
     */
    public initialize(canvasElement: HTMLCanvasElement): void {
        this.fabricCanvas = new fabric.Canvas(canvasElement, {
            width: this.config.canvasWidth,
            height: this.config.canvasHeight,
        });
    }

    /**
     * Clears the canvas by removing all objects from it.
     */
    public clearCanvas(): void {
        this.fabricCanvas.clear();
    }

    /**
     * Draws the given renderables on the canvas.
     * @param renderables - An array of renderable objects to be drawn on the canvas.
     */
    public async draw(renderables: IRenderable[]): Promise<void> {
        this.fabricCanvas.clear(); // Make sure the canvas is clear before drawing
        for (const renderable of renderables) {
            const objects = await renderable.getDrawableObjects();
            objects.forEach(obj => this.fabricCanvas.add(obj));
        }
        this.fabricCanvas.renderAll();
    }
}
