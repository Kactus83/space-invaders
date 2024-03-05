import { Invader } from './Invader';

export class InvadersGroup {
    public invaders: Invader[] = [];
    private direction = 1;
    private speed = 1;
    private downStep = 10;

    constructor(private ctx: CanvasRenderingContext2D, private rows: number, private columns: number, private invaderSpacing: number) {
        this.initialize();
    }

    private initialize() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const x = column * this.invaderSpacing + 100; 
                const y = row * this.invaderSpacing + 50; 
                this.invaders.push(new Invader(x, y));
            }
        }
    }

    update() {
        let reachEdge = false;

        // Vérifier si les envahisseurs atteignent le bord
        this.invaders.forEach(invader => {
            if (invader.x <= 0 || invader.x >= this.ctx.canvas.width - 40) {
                reachEdge = true;
            }
        });

        if (reachEdge) {
            this.direction *= -1;
            this.invaders.forEach(invader => {
                invader.y += this.downStep;
            });
        }

        this.invaders.forEach(invader => {
            invader.x += this.speed * this.direction;
        });
    }

    draw() {
        this.invaders.forEach(invader => invader.draw(this.ctx));
    }

    removeInvader(index: number) {
        this.invaders.splice(index, 1); 
    }
}
