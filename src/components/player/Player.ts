import { ProjectileType } from "../../types/ProjectileType";
import { Projectile } from "../projectiles/Projectile";
import { levelThresholds } from "./LevelThresholds";

export class Player {
    private level: number = 1;
    public x: number;
    public y: number;
    public speed = 5;
    private score = 0; 

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.x, this.y, 50, 30);
    }

    getColor() {
        if(this.level === 1) {
            return '#ffff00'; 
        } else if(this.level === 2) {
            return '#ffa500'; 
        } else {
            return '#ff0000'; 
        }
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }
    
    shoot(projectiles: Projectile[]) {
        const projectileType = this.getProjectileType();
        projectiles.push(new Projectile(this.x + 25, this.y - 10, projectileType));
    }  

    private getProjectileType(): ProjectileType {
        // Exemple de logique pour choisir le type de projectile en fonction du niveau
        if (this.level === 1) {
            return ProjectileType.Basic;
        } else if (this.level === 2) {
            return ProjectileType.Advanced;
        } else {
            return ProjectileType.Ultimate;
        }
    }

    getScore() {
        return this.score;
    }

    getLevel() {
        return this.level;
    }

    setScore(score: number) {
        this.score = score;
        // Convertir la clé en number
        Object.keys(levelThresholds).forEach(levelKey => {
            const level = parseInt(levelKey);
            if (score >= levelThresholds[level as keyof typeof levelThresholds]) {
                this.level = level;
                this.speed = level * 5;
            }
        });
    }    
}