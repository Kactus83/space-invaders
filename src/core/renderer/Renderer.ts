import { fabric } from "fabric";
import { IGlobalConfig } from "../config/IGlobalConfig";
import { IRenderable } from "./Irenderable";

export class Renderer {
    private fabricCanvas: fabric.Canvas;

    constructor(private config: IGlobalConfig) {
        // Initialiser le Canvas Fabric
        const canvasElement = document.getElementById('gameCanvas') as HTMLCanvasElement;
        this.fabricCanvas = new fabric.Canvas(canvasElement, {
            width: this.config.canvasWidth,
            height: this.config.canvasHeight,
        });
    }

    public clearCanvas(): void {
        this.fabricCanvas.clear();
    }

    public draw(renderables: IRenderable[]): void {
        this.fabricCanvas.clear(); // Assurez-vous que le canvas est clair avant de dessiner
        renderables.forEach(renderable => {
            const objects = renderable.getDrawableObjects();
            objects.forEach(obj => this.fabricCanvas.add(obj));
        });
        this.fabricCanvas.renderAll();
    }
}