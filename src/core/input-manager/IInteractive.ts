import { UserInputType } from "./UserInputType";

export interface IInteractive {
    handleInput(inputType: UserInputType): void;
}
