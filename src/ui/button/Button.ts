import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";

export class Button implements IRenderable {
    private fabricText: fabric.Text;
    private fabricRect: fabric.Rect;
    private highlightColor: string = '#FFA500';
    private defaultColor: string = '#FFF';
    private isHighlighted: boolean = false;
    public triggerAction: () => void;

    constructor(private text: string, private position: { x: number, y: number }, private width: number = 200, private height: number = 40) {
        this.fabricRect = new fabric.Rect({
            left: position.x - width / 2,
            top: position.y - height / 2,
            fill: 'rgba(0,0,0,0.5)',
            width: width,
            height: height,
            rx: 10, 
            ry: 10,
            stroke: '#FFF',
            strokeWidth: 2,
            shadow: 'rgba(0,0,0,0.5) 5px 5px 10px'
        });
        this.fabricText = new fabric.Text(text, {
            left: position.x,
            top: position.y,
            fontSize: 20,
            fill: this.defaultColor,
            originX: 'center',
            originY: 'center'
        });
        this.setHighlight(false); // Appliquer l'état initial non-surligné
    }

    getDrawableObjects(): fabric.Object[] {
        return [this.fabricRect, this.fabricText];
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

    trigger(): void {
        if (this.triggerAction) {
            this.triggerAction();
        }
    }
}
