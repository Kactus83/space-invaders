import { Player } from '../components/Player';
import { InvadersGroup } from '../components/InvadersGroup';
import { Projectile } from '../components/Projectile';
import { checkCollision } from '../utils/Collision';

export class GameEngine {
    private lastTime = 0;
    private player: Player;
    private invadersGroup: InvadersGroup;
    private projectiles: Projectile[] = [];

    constructor(private ctx: CanvasRenderingContext2D) {
        this.player = new Player(ctx.canvas.width / 2, ctx.canvas.height - 60);
        this.handleInputs();
        this.invadersGroup = new InvadersGroup(ctx, 5, 11, 40);
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    private loop(timeStamp: number) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.loop.bind(this));
    }
    private update(deltaTime: number) {
        this.invadersGroup.update();
        this.projectiles = this.projectiles.filter(projectile => {
            let active = true;
            projectile.update(deltaTime);
    
            // Supprimer si hors du canvas
            if (projectile.y < 0) {
                active = false;
            }
    
            // Vérifier les collisions avec les envahisseurs
            this.invadersGroup.invaders.forEach((invader, index) => {
                if (checkCollision(projectile, invader)) {
                    this.invadersGroup.removeInvader(index); 
                    this.player.score += 10; 
                    active = false;
                }
            });
    
            return active;
        });
    }    

    private draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.player.draw(this.ctx);
        this.invadersGroup.draw();
        this.projectiles.forEach(projectile => projectile.draw(this.ctx));
    }
    
    private handleInputs() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.player.moveLeft();
                    break;
                case 'ArrowRight':
                    this.player.moveRight();
                    break;
                case ' ':
                    this.player.shoot(this.projectiles); 
                    break;
            }
        });
    }
}
