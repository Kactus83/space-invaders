import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";

export class Button implements IRenderable {
    private fabricText: fabric.Text;
    private fabricRect: fabric.Rect;
    private highlightColor: string = '#FFA500';
    private defaultColor: string = '#FFF';
    private isHighlighted: boolean = false;
    public triggerAction: () => void;

    constructor(private text: string, private position: { x: number, y: number }, private width: number = 200, private height: number = 40, private onHover?: (button: Button) => void, private onMouseOut?: () => void) {
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
            shadow: 'rgba(0,0,0,0.5) 5px 5px 10px',
            selectable: false,
        });
        this.fabricText = new fabric.Text(text, {
            left: position.x,
            top: position.y,
            fontSize: 20,
            fill: this.defaultColor,
            originX: 'center',
            originY: 'center',
            selectable: false,
        });

        this.setHighlight(false);

        // Ajouter des écouteurs d'événements pour gérer le survol
        this.fabricRect.on('mouseover', () => {
            this.setHighlight(true);
            if(this.onHover) this.onHover(this);
        });
    
        this.fabricRect.on('mouseout', () => {
            this.setHighlight(false);
            if(this.onMouseOut) this.onMouseOut();
        });
        
        // Ajouter un écouteur pour le clic
        this.fabricRect.on('mousedown', () => {
            if(this.triggerAction) {
                this.triggerAction();
            }
        });
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

    cleanup() {
        // Supprime les écouteurs d'événements pour éviter les fuites de mémoire
        if (this.fabricRect) {
            this.fabricRect.off('mouseover');
            this.fabricRect.off('mouseout');
            this.fabricRect.off('mousedown');
        }
    }
    
}
