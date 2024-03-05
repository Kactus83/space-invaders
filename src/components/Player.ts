import { Projectile } from "./Projectile";

export class Player {
    private x: number;
    private y: number;
    private speed = 5; 

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
        // Crée un projectile au milieu du joueur
        projectiles.push(new Projectile(this.x + 25, this.y, 5));
    }

    // Ajoutez plus de méthodes au besoin, comme pour tirer un projectile
}