import { ProjectileType } from "../../types/ProjectileType";
import { ProjectileTypesAttributes } from "./ProjectileAttributes";

export class Projectile {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
    public damage: number;
    public color: string;

    constructor(x: number, y: number, type: ProjectileType) {
        const attributes = ProjectileTypesAttributes[type];
        this.x = x;
        this.y = y;
        this.speed = attributes.speed;
        this.damage = attributes.damage;
        this.color = attributes.color;
        this.width = attributes.width;
        this.height = attributes.height;
    }

    update(deltaTime: number) {
        this.y -= this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
