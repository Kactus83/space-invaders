export class Projectile {
    public x: number;
    public y: number;
    public width = 2;
    public height = 2;
    private speed = 10;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update(deltaTime: number) {
        this.y -= this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, 2, 10);
    }
}
