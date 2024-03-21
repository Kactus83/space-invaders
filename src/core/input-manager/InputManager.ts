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
    };

    private constructor() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
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
            this.subscribers.forEach(interactive => interactive.handleInput(inputType));
        }
    }

    public cleanup(): void {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
}
