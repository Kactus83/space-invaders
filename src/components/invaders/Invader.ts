import { InvaderType } from "../../types/InvaderType";
import { InvaderTypesAttributes } from "./InvaderAttributes";

export class Invader {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;
    private speed: number;
    public health: number;
    private destroyed: boolean = false;

    constructor(x: number, y: number, type: InvaderType) {
        const attributes = InvaderTypesAttributes[type];
        this.x = x;
        this.y = y;
        this.speed = attributes.speed;
        this.health = attributes.health;
        this.color = attributes.color;
        this.width = attributes.width;
        this.height = attributes.height;
    }

    update(moveDown: boolean, direction: number) {
        if (moveDown) {
            this.y += this.speed * 10; 
        }
        this.x += this.speed * direction;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
