import { UserInputType } from './UserInputType';

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
        const inputType = UserInputType[event.key as keyof typeof UserInputType];
        if (inputType) {
            this.subscribers.forEach(callback => callback(inputType));
        }
    }

    public cleanup(): void {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
}
