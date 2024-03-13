import { ITheme } from "../../themes/ITheme";
import { InvaderType } from "../../types/InvaderType";
import { InvaderTypesAttributes } from "./InvaderAttributes";

export class Invader implements IGameObject {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;
    public speed: number;
    public health: number;
    private destroyed: boolean = false;

    constructor(x: number, y: number, type: InvaderType, private theme: ITheme) {
        const design = this.theme.getInvaderDesign(type);
        const attributes = InvaderTypesAttributes[type];
        this.x = x;
        this.y = y;
        this.speed = attributes.speed;
        this.health = attributes.health;
        this.color = design.color;
        this.width = design.width;
        this.height = design.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(deltaTime?: number, moveDown: boolean = false, direction: number = 0) {
        if (moveDown) {
            this.y += this.speed * 10; 
        }
        this.x += this.speed * direction;
    }

    takeDamage(amount: number) {
        this.health -= amount;
        if (this.health <= 0) {
            this.destroyed = true;
        }
    }

    getDestroyed() {
        return this.destroyed;
    }
}
