export class Projectile {
    constructor(private x: number, private y: number, private speed: number = 5) {}

    update(deltaTime: number) {
        this.y -= this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, 2, 10);
    }
}
