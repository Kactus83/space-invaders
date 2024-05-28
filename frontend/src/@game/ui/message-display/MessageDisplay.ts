import { fabric } from "fabric";
import { IRenderable } from "../../services/renderer/Irenderable";
import { AppConfig } from "../../config/AppConfig";

export class MessageDisplay implements IRenderable {
    private message: string;
    private fabricText: fabric.IText;

    constructor(message: string) {
        this.message = message;
        const config = AppConfig.getInstance();
        this.fabricText = new fabric.IText(message, {
            left: config.canvasWidth / 2,
            top: config.canvasHeight / 2,
            fontSize: 30,
            fill: '#FFFFFF',
            textAlign: 'center',
            originX: 'center',
            originY: 'center',
            selectable: false,
        });
    }

    async getDrawableObjects(): Promise<fabric.Object[]> {
        return [this.fabricText];
    }
}
