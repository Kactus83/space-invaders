import { UserInputType } from "./UserInputType";
import { IInteractive } from "./IInteractive";

/**
 * Class that manages user input and dispatches it to subscribers.
 */
/**
 * Manages user input and provides callbacks for subscribed entities.
 */
export class InputManager {

    // Singleton instance
    private static instance: InputManager;

    // Subscribers & ID management
    private subscribers: Map<number, IInteractive> = new Map();
    private nextId: number = 0;

    // Key mapping
    private keyMap: { [key: string]: UserInputType } = {
        "ArrowLeft": UserInputType.Left,
        "ArrowRight": UserInputType.Right,
        " ": UserInputType.Shoot,
        "ArrowUp": UserInputType.Up,
        "ArrowDown": UserInputType.Down,
        "Enter": UserInputType.Enter,
        "i": UserInputType.ToggleHUD,
        "Escape": UserInputType.Escape,
        "Shift": UserInputType.Shift,
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
        "!": UserInputType.Exclamation,
        "@": UserInputType.AtSign,
        "#": UserInputType.Hash,
        "$": UserInputType.Dollar,
        "%": UserInputType.Percent,
        "^": UserInputType.Caret,
        "&": UserInputType.Ampersand,
        "*": UserInputType.Asterisk,
        "(": UserInputType.LeftParenthesis,
        ")": UserInputType.RightParenthesis,
        "é": UserInputType.EAcute,
        "\"": UserInputType.DoubleQuote,
        "'": UserInputType.SingleQuote,
        "-": UserInputType.Dash,
        "è": UserInputType.EGrave,
        "_": UserInputType.Underscore,
        "ç": UserInputType.CCedilla,
        "à": UserInputType.AGrave,
        "=": UserInputType.Equals,
    };

    private keysPressed: { [key: string]: boolean } = {};

    /**
     * Constructor for the InputManager class.
     * Initializes the key event listeners.
     */
    private constructor() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Get the singleton instance of the InputManager.
     * @returns The singleton instance of the InputManager.
     */
    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }

    /**
     * Allow components to subscribe to user input callbacks.
     * @param interactive The entity that subscribes.
     * @returns The id of the subscription.
     */
    public subscribe(interactive: IInteractive): number {
        const id = this.nextId++;
        this.subscribers.set(id, interactive);
        return id;
    }

    /**
     * Allow components to unsubscribe from user input callbacks.
     * @param id The subscription id of the entity.
     */
    public unsubscribe(id: number): void {
        this.subscribers.delete(id);
    }

    /**
     * Handles the keydown event and triggers the appropriate callback for the subscribed entities.
     * @param event The keydown event.
     */
    private handleKeyDown(event: KeyboardEvent): void {
        const inputType = this.keyMap[event.key];
        if (inputType) {
            this.keysPressed[event.key] = true;
            this.subscribers.forEach(interactive => interactive.handleInput(inputType));
        }
    }

    /**
     * Handles the keyup event and updates the keysPressed object accordingly.
     * @param event The keyup event.
     */
    private handleKeyUp(event: KeyboardEvent): void {
        const inputType = this.keyMap[event.key];
        if (inputType) {
            this.keysPressed[event.key] = false;
        }
    }

    /**
     * Checks if a specific key is currently pressed.
     * @param key The UserInputType to check.
     * @returns True if the key is pressed, false otherwise.
     */
    public isKeyPressed(key: UserInputType): boolean {
        return !!this.keysPressed[key];
    }

    /**
     * Cleans up the event listeners.
     */
    public cleanup(): void {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
        window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    }
}