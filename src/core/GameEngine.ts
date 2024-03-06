import { Player } from '../components/player/Player';
import { InvadersGroup } from '../components/invaders/InvadersGroup';
import { Projectile } from '../components/projectiles/Projectile';
import { checkCollision } from '../utils/Collision';
import { GameState } from '../types/GameState';

export class GameEngine {

    private gameState: GameState = GameState.Running;
    private lastTime = 0;
    private player: Player;
    private invadersGroup: InvadersGroup;
    private projectiles: Projectile[] = [];

    private lastDisplayedScore: number = 0;
    private lastDisplayedLevel: number = 0;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.player = new Player(ctx.canvas.width / 2, ctx.canvas.height - 60);
        this.handleInputs();
        this.invadersGroup = new InvadersGroup(ctx, 5, 11, 40);
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    private loop(timeStamp: number) {

        if (this.gameState !== GameState.Running) {
            this.handleEndGame();
            return; 
        }
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
            this.invadersGroup.invaders.forEach((invader, iIndex) => {
                if (checkCollision(projectile, invader)) {
                    invader.takeDamage(projectile.damage); 
                    const newScore = this.player.getScore() + 10; 
                    this.player.setScore(newScore);
                    active = false; 
                }
            });
            
        if (this.gameState === GameState.Running) {
            this.checkWinCondition();
            this.checkLoseCondition();
        }
    
            return active;
        });
    }    

    private draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.player.draw(this.ctx);
        this.invadersGroup.draw();
        this.projectiles.forEach(projectile => projectile.draw(this.ctx));
        this.drawScore();
    }


    private drawScore() {
        const scoreElement = document.getElementById('scoreDisplay');
        const levelElement = document.getElementById('levelDisplay');
    
        if (scoreElement) {
            scoreElement.innerHTML = `Score: ${this.player.getScore()}`;
        }
        if (levelElement) {
            levelElement.innerHTML = `Level: ${this.player.getLevel()}`;
        }
    
        // Déclencher une animation CSS si le score ou le niveau a changé
        if (this.player.getScore() !== this.lastDisplayedScore) {
            scoreElement?.classList.add('flash-animation');
            setTimeout(() => scoreElement?.classList.remove('flash-animation'), 1000);
            this.lastDisplayedScore = this.player.getScore();
        }
        if (this.player.getLevel() !== this.lastDisplayedLevel) {
            levelElement?.classList.add('flash-animation');
            setTimeout(() => levelElement?.classList.remove('flash-animation'), 1000);
            this.lastDisplayedLevel = this.player.getLevel();
        }
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
    
    private handleEndGame() {
        const message = this.gameState === GameState.Won ? "Victoire !" : "Défaite !";
        console.log(message);
        // Afficher ici le message sur le canvas ou via une alerte/élément HTML
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(message, this.ctx.canvas.width / 2 - 50, this.ctx.canvas.height / 2);
    }

    private checkWinCondition() {
        if (this.invadersGroup.invaders.length === 0) {
            this.gameState = GameState.Won;
        }
    }
    
    private checkLoseCondition() {
        const lost = this.invadersGroup.invaders.some(invader => 
            invader.y + invader.height >= this.player.y 
        );
    
        if (lost) {
            this.gameState = GameState.Lost;
        }
    }
    
}
