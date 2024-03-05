import { Projectile } from "./Projectile";

export class Player {
    private x: number;
    private y: number;
    public speed = 5;
    public score = 0; 

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x, this.y, 50, 30);
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }
    
    shoot(projectiles: Projectile[]) {
        projectiles.push(new Projectile(this.x + 25, this.y - 10));
    }
}