import { UserInputType } from "./UserInputType";
import { IInteractive } from "./IInteractive";

export class InputManager {
    private static instance: InputManager;
    private subscribers: Map<number, IInteractive> = new Map();
    private nextId: number = 0;
    private keyMap: { [key: string]: UserInputType } = {
        "ArrowLeft": UserInputType.Left,
        "ArrowRight": UserInputType.Right,
        " ": UserInputType.Shoot,
        "ArrowUp": UserInputType.Up,
        "ArrowDown": UserInputType.Down,
        "Enter": UserInputType.Enter,
        "i": UserInputType.ToggleHUD,
        "Escape": UserInputType.Escape,
        "1": UserInputType.Num1,
        "2": UserInputType.Num2,
        "3": UserInputType.Num3,
        "4": UserInputType.Num4,
        "5": UserInputType.Num5,
        "6": UserInputType.Num6,
        "7": UserInputType.Num7,
        "8": UserInputType.Num8,
        "9": UserInputType.Num9,
        "0": UserInputType.Num0,
    };
    private keysPressed: { [key: string]: boolean } = {};

    private constructor() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }

    public subscribe(interactive: IInteractive): number {
        const id = this.nextId++;
        this.subscribers.set(id, interactive);
        return id;
    }

    public unsubscribe(id: number): void {
        this.subscribers.delete(id);
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const inputType = this.keyMap[event.key];
        if (inputType) {
            this.keysPressed[event.key] = true; // Marquer la touche comme enfoncée
            this.subscribers.forEach(interactive => interactive.handleInput(inputType));
        }
    }

    private handleKeyUp(event: KeyboardEvent): void {
        const inputType = this.keyMap[event.key];
        if (inputType) {
            this.keysPressed[event.key] = false; // Marquer la touche comme relâchée
        }
    }

    public isKeyPressed(key: UserInputType): boolean {
        return !!this.keysPressed[key];
    }

    public cleanup(): void {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
        window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    }
}