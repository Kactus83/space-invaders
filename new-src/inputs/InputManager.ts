import { UserInputType } from './UserInputType';

export class InputManager {
    private inputCallback: (input: UserInputType) => void;

    public initialize(inputCallback: (input: UserInputType) => void): void {
        this.inputCallback = inputCallback;
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const inputType = UserInputType[event.key as keyof typeof UserInputType];
        if (inputType && this.inputCallback) {
            this.inputCallback(inputType);
        }
    }

    public cleanup(): void {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
}