import { IScene } from "../../core/scene-manager/types/IScene";
import { IRenderable } from "../../core/renderer/Irenderable";
import { SceneManager } from "../../core/scene-manager/SceneManager";
import { SceneIds } from "../../core/scene-manager/types/SceneIds";
import { Menu } from "../../ui/menu/Menu";
import { HorizontalMenu } from "../../ui/menu/HorizontalMenu";
import { UserLoginService } from "../../game-services/user-login/UserLoginService";

export class PlayerNameEntryScene implements IScene {
    private verticalMenu: Menu | null = null;
    private horizontalMenu: HorizontalMenu;
    private inputElement: HTMLInputElement | null = null;
    private playersList: string[] = [];

    async initialize(): Promise<void> {
        this.playersList = UserLoginService.getInstance().getPlayers();
        this.createHorizontalMenu();
        this.updateVerticalMenuWithPlayers();
    }

    update(deltaTime: number): void {}

    getDrawableObjects(): IRenderable[] {
        const drawables = [];
        if (this.verticalMenu) drawables.push(this.verticalMenu);
        if (this.horizontalMenu) drawables.push(this.horizontalMenu);
        return drawables;
    }

    cleanup(): void {
        this.verticalMenu?.cleanup();
        this.horizontalMenu.cleanup();
        if (this.inputElement) {
            this.inputElement.remove();
            this.inputElement = null;
        }
        // Remove input element and its event listeners
        if (this.inputElement) {
            document.body.removeChild(this.inputElement); // Remove from DOM
            this.inputElement = null; // Help GC
        }
    
        // Remove validation button and its event listeners
        const validationButton = document.querySelector(".buttonAnimated");
        if (validationButton) {
            validationButton.removeEventListener("click", this.validateAndSavePlayerName);
            document.body.removeChild(validationButton); // Remove from DOM
        }
    }    

    private createHorizontalMenu(): void {
        const navigationButtonNames = ["Choose existing profile", "Create new profile"];
        const navigationButtonActions = [
            () => this.updateVerticalMenuWithPlayers(),
            () => this.createNewPlayerInput()
        ];
        this.horizontalMenu = new HorizontalMenu(navigationButtonNames, navigationButtonActions);
    }

    private updateVerticalMenuWithPlayers(): void {
        // Cleanup previous verticalMenu if it exists
        if (this.verticalMenu) {
            this.verticalMenu.cleanup();
            this.verticalMenu = null;
        }
        // Cleanup inputElement if it exists
        if (this.inputElement) {
            this.inputElement.remove();
            this.inputElement = null;
        }
    
        // Remove validation button and its event listeners
        const validationButton = document.querySelector(".buttonAnimated");
        if (validationButton) {
            validationButton.removeEventListener("click", this.validateAndSavePlayerName);
            document.body.removeChild(validationButton); // Remove from DOM
        }

        const playerButtonNames = this.playersList.length > 0 ? this.playersList : ["No player registered."];
        const playerButtonActions = this.playersList.map(playerName => {
            return () => {
                UserLoginService.getInstance().setActivePlayerName(playerName);
                SceneManager.getInstance().changeScene(SceneIds.MainMenu);
            };
        });

        this.verticalMenu = new Menu(playerButtonNames, playerButtonActions);
    }

    private createNewPlayerInput(): void {
        // Cleanup verticalMenu and inputElement if they exist
        this.verticalMenu?.cleanup();
        this.verticalMenu = null;
        if (this.inputElement) {
            this.inputElement.remove();
        }

        // Create validation button
        const validationButton = document.createElement("button");
        validationButton.textContent = "Let's Go";
        validationButton.className = "buttonAnimated";

        // Create a new HTML input element for player name entry
        this.inputElement = document.createElement("input");
        this.inputElement.type = "text";
        this.inputElement.placeholder = "Choose your name";
        this.inputElement.className = "inputAnimated";

        // Position and append elements to the body
        document.body.appendChild(this.inputElement);
        document.body.appendChild(validationButton);
        this.inputElement.focus();

        // Event listener for pressing Enter key
        const enterKeyListener = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                this.validateAndSavePlayerName();
                removeEventListeners();
            }
        };

        // Event listener for button click
        const buttonClickListener = () => {
            this.validateAndSavePlayerName();
            removeEventListeners();
        };

        // Function to remove event listeners
        const removeEventListeners = () => {
            this.inputElement?.removeEventListener("keypress", enterKeyListener);
            validationButton.removeEventListener("click", buttonClickListener);
        };

        // Add event listeners
        this.inputElement.addEventListener("keypress", enterKeyListener);
        validationButton.addEventListener("click", buttonClickListener);
    }
    
    private validateAndSavePlayerName(): void {
        if (this.inputElement && this.inputElement.value.trim()) {
            const playerName = this.inputElement.value.trim();
            UserLoginService.getInstance().savePlayerName(playerName);
            UserLoginService.getInstance().setActivePlayerName(playerName);
            SceneManager.getInstance().changeScene(SceneIds.MainMenu);
        }
    }
}    
