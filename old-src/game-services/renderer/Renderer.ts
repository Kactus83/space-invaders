import { fabric } from 'fabric';

export class Renderer {
    constructor(private canvas: fabric.Canvas) {}

    public draw(objects: fabric.Object[]): void {
        this.clearCanvas();
        objects.forEach(obj => this.canvas.add(obj));
        this.canvas.renderAll(); 
    }

    public clearCanvas(): void {
        this.canvas.clear();
    }
}
