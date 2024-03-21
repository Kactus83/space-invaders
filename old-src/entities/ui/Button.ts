import { fabric } from 'fabric';

export class Button {
    public object: fabric.IText;

    constructor(
        text: string,
        x: number,
        y: number,
        onClick: () => void
    ) {
        this.object = new fabric.IText(text, {
            left: x,
            top: y,
            fontSize: 20,
            selectable: false,
            hasControls: false,
            hoverCursor: 'pointer',
        });

        // Ajouter l'événement de clic
        this.object.on('mousedown', onClick);
    }
}