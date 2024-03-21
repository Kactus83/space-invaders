import { fabric } from "fabric";
import { IInteractive } from "../../core/input-manager/IInteractive";
import { IRenderable } from "../../core/renderer/Irenderable";
import { InputManager } from "../../core/input-manager/InputManager";
import { UserInputType } from "../../core/input-manager/UserInputType";

export class Button implements IRenderable, IInteractive {
    private text: string;
    private position: { x: number, y: number };
    private inputManager: InputManager;

    constructor(text: string, position: { x: number, y: number }) {
        this.text = text;
        this.position = position;
        this.inputManager = InputManager.getInstance();
        this.inputManager.subscribe(this.handleInput.bind(this));
    }

    getDrawableObjects(): fabric.Object[] {
        const button = new fabric.Text(this.text, {
            left: this.position.x,
            top: this.position.y,
            fontSize: 20,
            fill: '#fff'
        });
        return [button];
    }

    handleInput(inputType: UserInputType): void {
        // Logique de réaction aux entrées utilisateur
        console.log(`Button ${this.text} received input: ${inputType}`);
    }

    cleanup(): void {
        this.inputManager.unsubscribe(this.handleInput.bind(this));
    }
}
