import { UserInputType } from "./UserInputType";

export class InputManager {
    private subscribers: ((input: UserInputType) => void)[] = [];

    constructor() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    public subscribe(callback: (input: UserInputType) => void): void {
        this.subscribers.push(callback);
    }

    public unsubscribe(callback: (input: UserInputType) => void): void {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const inputType = this.mapKeyToInputType(event.key);
        if (inputType) {
            this.subscribers.forEach(callback => callback(inputType));
        } else {
            console.log(`No mapping found for key: ${event.key}`);
        }
    }

    private mapKeyToInputType(key: string): UserInputType | undefined {
        switch (key) {
            case "ArrowLeft": return UserInputType.Left;
            case "ArrowRight": return UserInputType.Right;
            case "ArrowUp": return UserInputType.Up;
            case "ArrowDown": return UserInputType.Down;
            case " ": return UserInputType.Shoot;
            case "Enter": return UserInputType.Enter;
            default: return undefined; 
        }
    }

    public cleanup(): void {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
}
