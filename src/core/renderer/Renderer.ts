import { fabric } from "fabric";
import { IGlobalConfig } from "../config/IGlobalConfig";

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

    public draw(objects: fabric.Object[]): void {
        objects.forEach(obj => this.fabricCanvas.add(obj));
        this.fabricCanvas.renderAll();
    }
}