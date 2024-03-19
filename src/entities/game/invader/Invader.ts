import { BaseEntity } from '../BaseEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../../themes/ThemeManager';
import { ProjectileService } from '../projectile/ProjectileService';
import { config } from '../../../config/config';
import { InvaderType } from './InvaderType';
import { InvaderSpecs } from './InvaderTypesSpecs';
import { ProjectileOrigin } from '../projectile/Projectileorigin';

export class Invader extends BaseEntity {
    type: InvaderType;
    hp: number;
    speed: number;
    damage: number;
    score: number;
    lastShootTime: number = Date.now();
    projectileService: ProjectileService;

    constructor(themeManager: ThemeManager, type: InvaderType, x: number, y: number, projectileService: ProjectileService) {
        super(themeManager, x, y);
        this.type = type;
        const specs = InvaderSpecs[type];
        this.hp = specs.hp;
        this.speed = specs.speed;
        this.score = specs.score;
        this.damage = specs.damage;
        this.projectileService = projectileService;
        this.loadDesign();
    }

    public async loadDesign(): Promise<void> {
        const design = this.themeManager.getInvaderDesign(this.type.toString());
        if (design.svgPath) {
            await new Promise<void>((resolve) => {
                fabric.loadSVGFromURL(design.svgPath, (objects, options) => {
                    const svg = fabric.util.groupSVGElements(objects, options);
                    this.fabricObject = svg.set({
                        left: this.x,
                        top: this.y,
                        scaleX: design.width / svg.width,
                        scaleY: design.height / svg.height,
                    });
                    resolve();
                });
            });
        } else {
            this.fabricObject = new fabric.Rect({
                left: this.x,
                top: this.y,
                fill: design.color,
                width: design.width,
                height: design.height,
            });
        }
    }

    update(deltaTime: number): void {
        // Calcul du déplacement potentiel
        let potentialLeft = this.fabricObject.left + (this.speed * deltaTime);
    
        // Vérification si l'invader va dépasser le bord gauche du canvas
        if (potentialLeft < 0) {
            this.speed *= -1; // Inverser la direction
            potentialLeft = Math.abs(potentialLeft); // Réajuster la position pour rester dans le canvas
            this.fabricObject.top += 60; // Descendre d'une ligne
        }
        // Vérification si l'invader va dépasser le bord droit du canvas
        else if (potentialLeft + this.fabricObject.width > config.canvas.width) {
            this.speed *= -1; // Inverser la direction
            potentialLeft = config.canvas.width - (potentialLeft + this.fabricObject.width - config.canvas.width) - this.fabricObject.width; // Réajuster pour rester dans le canvas
            this.fabricObject.top += 60; // Descendre d'une ligne
        }
    
        // Appliquer le déplacement calculé
        this.fabricObject.left = potentialLeft;
    }
    
    public applyDamage(damage: number): boolean {
        this.hp -= damage;
        return this.hp <= 0;
    }

    public shoot(): void {
        const specs = InvaderSpecs[this.type];
        const now = Date.now();
    
        // Assurez-vous que l'invader est au moins à 50 pixels du haut du canvas avant de tirer
        if (this.fabricObject.top > 50 && now - this.lastShootTime > 1000 / specs.fireRate) {
            const projectileX = this.fabricObject.left + this.fabricObject.width / 2;
            const projectileY = this.fabricObject.top + this.fabricObject.height;
            this.projectileService.createProjectile(specs.projectileType, projectileX, projectileY, ProjectileOrigin.Invader);
            this.lastShootTime = now;
        }
    }    
}
