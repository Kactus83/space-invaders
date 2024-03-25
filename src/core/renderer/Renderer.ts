import { fabric } from "fabric";
import { IGlobalConfig } from "../config/IGlobalConfig";
import { IRenderable } from "./Irenderable";
import { AppConfig } from "../config/AppConfig";

export class Renderer {
    private fabricCanvas: fabric.Canvas;
    private config: IGlobalConfig;

    constructor() {
        this.config = AppConfig.getInstance();
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

    public async draw(renderables: IRenderable[]): Promise<void> {
        this.fabricCanvas.clear(); // Assurez-vous que le canvas est clair avant de dessiner
        for (const renderable of renderables) {
            const objects = await renderable.getDrawableObjects();
            objects.forEach(obj => this.fabricCanvas.add(obj));
        }
        this.fabricCanvas.renderAll();
    }
}