import { fabric } from 'fabric';
import { ThemeManager } from '../themes/ThemeManager';
import { Button } from '../entities/ui/Button'; 

export class Renderer {
    constructor(private canvas: fabric.Canvas, private themeManager: ThemeManager) {}

    public createButton(label: string, x: number, y: number, onClick: () => void): Button {
        return new Button(this, label, x, y, onClick);
    }

    public addToCanvas(obj: fabric.Object): void {
        this.canvas.add(obj);
    }

    public removeFromCanvas(obj: fabric.Object): void {
        this.canvas.remove(obj);
    }

    public clearCanvas(): void {
        this.canvas.clear();
    }
}