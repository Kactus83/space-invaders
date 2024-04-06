import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";

export class SquareButton implements IRenderable {
    private fabricText: fabric.Text;
    private fabricRect: fabric.Rect;
    private highlightColor: string = '#FFA500'; 
    private defaultColor: string = '#FFF'; 
    private isHighlighted: boolean = false;
    public triggerAction: () => void;

    constructor(private text: string, private position: { x: number, y: number }, private size: number = 50) {
        this.fabricRect = new fabric.Rect({
            left: position.x - size / 2,
            top: position.y - size / 2,
            fill: 'rgba(0,0,0,0.5)',
            width: size,
            height: size,
            rx: 5,
            ry: 5,
            stroke: '#FFF',
            strokeWidth: 1,
            shadow: 'rgba(0,0,0,0.5) 3px 3px 7px',
            selectable: false,
        });
        this.fabricText = new fabric.Text(text, {
            left: position.x,
            top: position.y,
            fontSize: 16, 
            fill: this.defaultColor,
            originX: 'center',
            originY: 'center',
            selectable: false,
        });
        this.setHighlight(false);
    }

    getDrawableObjects(): Promise<fabric.Object[]> {
        return Promise.resolve([this.fabricRect, this.fabricText]);
    }

    setHighlight(isHighlighted: boolean): void {
        this.isHighlighted = isHighlighted;
        this.fabricText.set({ fill: isHighlighted ? this.highlightColor : this.defaultColor });
        if (isHighlighted) {
            this.fabricRect.set({ fill: 'rgba(100,100,100,0.5)' });
        } else {
            this.fabricRect.set({ fill: 'rgba(0,0,0,0.5)' });
        }
    }
    
    public updateText(newText: string): void {
        this.text = newText;
        this.fabricText.set({ text: newText });
    }

    trigger(): void {
        if (this.triggerAction) {
            this.triggerAction();
        }
    }
}
