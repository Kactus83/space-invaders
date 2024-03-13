import { fabric } from 'fabric';
import { Renderer } from '../../renderer/Renderer';

export class Button {
    public object: fabric.IText;

    constructor(
        private renderer: Renderer,
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

        // Ajouter le bouton au canvas via le Renderer
        this.renderer.addToCanvas(this.object);
    }
}