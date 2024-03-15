import { fabric } from 'fabric';

export class MenuButton {
    public object: fabric.Group;

    constructor(text: string, x: number, y: number, onClick: () => void) {
        const btnBackground = new fabric.Rect({
            fill: 'blue', // Choisissez une couleur adaptée
            rx: 5, // Bord arrondi pour un look moderne
            ry: 5,
            width: 200, // Largeur du bouton
            height: 50, // Hauteur du bouton
            originX: 'center',
            originY: 'center',
        });

        const btnText = new fabric.Text(text, {
            fontSize: 20,
            originX: 'center',
            originY: 'center',
            fill: 'white', // Couleur du texte
        });

        this.object = new fabric.Group([btnBackground, btnText], {
            left: x,
            top: y,
            selectable: false,
            hasControls: false,
            hoverCursor: 'pointer',
        });

        // Ajouter l'événement de clic au groupe
        this.object.on('mousedown', onClick);
    }
}
