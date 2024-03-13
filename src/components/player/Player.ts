import { ITheme } from "../../themes/ITheme";
import { ProjectileType } from "../../types/ProjectileType";
import { Projectile } from "../projectiles/Projectile";
import { levelThresholds } from "./LevelThresholds";

export class Player implements IGameObject {
    private level: number = 1;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;
    public speed: number = 5;
    private score: number = 0;

    constructor(x: number, y: number, private theme: ITheme) {
        this.x = x;
        this.y = y;
        this.updateDesign();
    }

    updateDesign() {
        const design = this.theme.getPlayerDesign(this.level);
        this.color = design.color;
        this.width = design.width;
        this.height = design.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(deltaTime?: number, moveDown?: boolean, direction?: number): void {
        
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
        projectiles.push(new Projectile(this.x + 25, this.y - 10, projectileType, this.theme));
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