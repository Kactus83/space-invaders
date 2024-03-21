import { IRenderable } from "../../core/renderer/Irenderable";
import { IScene } from "../../core/scene-manager/types/IScene";
import { Button } from "../../ui/button/Button";

export class MainMenuScene implements IScene {
    private buttons: Button[] = [];

    async initialize(): Promise<void> {
        this.buttons.push(new Button('Start Game', { x: 100, y: 100 }));
        this.buttons.push(new Button('Settings', { x: 100, y: 140 }));
    }

    update(deltaTime: number): void {
        // Mise à jour des animations ou autres éléments de la scène ici
    }

    getDrawableObjects(): IRenderable[] {
        return this.buttons;
    }

    cleanup(): void {
        this.buttons.forEach(button => button.cleanup());
    }
}
