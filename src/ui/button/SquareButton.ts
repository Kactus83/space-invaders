import { fabric } from "fabric";
import { IRenderable } from "../../core/renderer/Irenderable";

export class SquareButton implements IRenderable {
    public width: number;
    private fabricText: fabric.Text;
    private fabricRect: fabric.Rect;
    private highlightColor: string = '#FFA500'; 
    private defaultColor: string = '#FFF'; 
    private isHighlighted: boolean = false;
    public triggerAction: () => void;

    constructor(private text: string, public position: { x: number, y: number }, private padding: number = 10) {
        // Créez d'abord le texte pour pouvoir calculer sa largeur
        this.fabricText = new fabric.Text(text, {
            left: position.x,
            top: position.y,
            fontSize: 14, 
            fill: this.defaultColor,
            originX: 'center',
            originY: 'center',
            selectable: false,
        });

        // Calculez la largeur nécessaire basée sur le texte et le padding
        const textWidth = this.fabricText.width + padding * 2;
        const size = Math.max(textWidth, 50); // Assurez-vous que la taille est au moins de 50 pour éviter les boutons trop petits

        // Ensuite, créez le rectangle de fond avec la largeur calculée
        this.fabricRect = new fabric.Rect({
            left: position.x - size / 2,
            top: position.y - this.fabricText.height / 2 - padding / 2,
            fill: 'rgba(0,0,0,0.5)',
            width: size,
            height: this.fabricText.height + padding,
            rx: 5, // Pour des coins arrondis
            ry: 5,
            stroke: '#FFF',
            strokeWidth: 1,
            shadow: 'rgba(0,0,0,0.5) 3px 3px 7px',
            selectable: false,
        });

        this.width = size;

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
        // Mise à jour de la largeur du rectangle après avoir modifié le texte
        const textWidth = this.fabricText.width + this.padding * 2;
        const size = Math.max(textWidth, 50); // Assurez-vous que la taille est au moins de 50
        this.fabricRect.set({ width: size });
    }

    public updatePosition(position: { x: number, y: number }): void {
        this.position = position;
        this.fabricRect.set({ left: position.x - this.width / 2 });
        this.fabricText.set({ left: position.x });
    }


    trigger(): void {
        if (this.triggerAction) {
            this.triggerAction();
        }
    }
}
