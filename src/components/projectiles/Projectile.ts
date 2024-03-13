import { ITheme } from "../../themes/ITheme";
import { ProjectileType } from "../../types/ProjectileType";
import { ProjectileTypesAttributes } from "./ProjectileAttributes";

export class Projectile implements IGameObject {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public speed: number;
    public damage: number;
    public color: string;

    constructor(x: number, y: number, type: ProjectileType, private theme: ITheme) {
        const design = this.theme.getProjectileDesign(type);
        this.x = x;
        this.y = y;
        this.speed = ProjectileTypesAttributes[type].speed;
        this.damage = ProjectileTypesAttributes[type].damage;
        this.color = design.color;
        this.width = design.width;
        this.height = design.height;
    }

    update(deltaTime: number) {
        this.y -= this.speed * deltaTime;
    }

    draw(ctx: CanvasRenderingContext2D) {
        // Supposons que la méthode de dessin utilise les paths SVG ou simplement la couleur pour le moment
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
