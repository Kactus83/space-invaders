import { UserInputType } from "./UserInputType";

/**
 * Interface for interactive objects that can react to user input.
 */
export interface IInteractive {
    handleInput(inputType: UserInputType): void;
}
