export class Invader {
    public x: number;
    public y: number;
    private speed = 1;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update(moveDown: boolean, direction: number) {
        if (moveDown) {
            this.y += 10; 
        }
        this.x += this.speed * direction; 
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.x, this.y, 10, 20);
    }
}
