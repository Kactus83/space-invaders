import { GameEntity } from "../../GameEntity";
import { Player } from "../../player/Player";
import { Projectile } from "../../projectile/Projectile";
import { ProjectileType } from "../../projectile/ProjectileType";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
import { SkillsIds } from "../skill-system/types/SkillsIds";
import { IWeaponCharacteristics } from "./IWeaponCharacteristics";
import { WeaponBonus } from "./bonus/WeaponBonus";

export class WeaponSystem extends BonusReceiverTemplate<WeaponBonus> {
    projectileType: ProjectileType;
    fireRate: number;
    shootProbability: number;

    private lastShootTime: number = 0;
    private newProjectiles: Projectile[] = [];
    private owner: GameEntity;

    constructor(owner: GameEntity, characteristics: IWeaponCharacteristics) {
        super();
        this.owner = owner;
        this.projectileType = characteristics.projectileType;
        this.fireRate = characteristics.fireRate;
        this.shootProbability = characteristics.shootProbability;
        this.lastShootTime = performance.now();
    }

    public updateCharacteristics(newCharacteristics: IWeaponCharacteristics): void {
        this.projectileType = newCharacteristics.projectileType;
        this.fireRate = newCharacteristics.fireRate;
        this.shootProbability = newCharacteristics.shootProbability;
    }

    public async shoot(): Promise<void> {
        const currentTime = performance.now();
        const timeSinceLastShoot = currentTime - this.lastShootTime;
        if (timeSinceLastShoot >= 1000 / this.effectiveFireRate) {
            if (Math.random() <= this.effectiveShootProbability) {
                this.generateProjectilesBasedOnSkills();
                this.lastShootTime = currentTime;
            }
        }
    }
    
    private async generateProjectilesBasedOnSkills(): Promise<void> {
        const bounds = this.owner.getCollisionBounds();
        const xOrigin = bounds.x + bounds.width / 2;
        let yOrigin;
        if (this.owner instanceof Player) {
            yOrigin = bounds.y - bounds.height / 2;
            
            // Check for Double and Triple Shot Skills
            if (this.owner.skillSystem.isSkillActive(SkillsIds.Double_Shot)) {
                this.createAndAddProjectile(xOrigin, yOrigin, -8); // Offset for double shot
                this.createAndAddProjectile(xOrigin, yOrigin, 8); // Offset for double shot
            } else if (this.owner.skillSystem.isSkillActive(SkillsIds.Triple_Shot)) {
                this.createAndAddProjectile(xOrigin, yOrigin, -12); // Offset for triple shot
                this.createAndAddProjectile(xOrigin, yOrigin, 0); // Central projectile
                this.createAndAddProjectile(xOrigin, yOrigin, 12); // Offset for triple shot
            } else {
                // Default single shot
                this.createAndAddProjectile(xOrigin, yOrigin, 0);
            }
        } else {
            yOrigin = bounds.y + bounds.height / 2;
            // Default behavior for non-player entities
            this.createAndAddProjectile(xOrigin, yOrigin, 0);
        }
    }
    
    private async createAndAddProjectile(x: number, y: number, xOffset: number): Promise<void> {
        const projectile = new Projectile(
            this.owner,
            this.effectiveProjectileType,
            { x: x + xOffset, y: y }
        );
        await projectile.init();
        this.newProjectiles.push(projectile);
    }    

    public get effectiveFireRate(): number {
        let rate = this.fireRate;
        if (this.currentBonus) {
            const effect = this.currentBonus.getEffect();
            rate += effect.additional_fireRate;
            rate *= effect.multiplicator_fireRate;
        }
        return rate;
    }

    public get effectiveShootProbability(): number {
        let probability = this.shootProbability;
        if (this.currentBonus) {
            const effect = this.currentBonus.getEffect();
            probability += effect.additional_ShootProbability;
            probability /= effect.multiplicator_ShootProbability;
        }
        return probability;
    }

    
    public get effectiveProjectileType(): ProjectileType {
        if (this.currentBonus) {
            const upgradeSteps = this.currentBonus.getEffect().upgrade_ProjectileType;
            return this.upgradeProjectileType(this.projectileType, upgradeSteps);
        }
        return this.projectileType;
    }

    public getNewProjectiles(): Projectile[] {
        const projectiles = [...this.newProjectiles];
        this.newProjectiles = [];
        return projectiles;
    }

    private  upgradeProjectileType(currentType: ProjectileType, upgradeSteps: number): ProjectileType {
        const types = Object.values(ProjectileType);
        let currentIndex = types.indexOf(currentType);
        let newIndex = Math.min(types.length - 1, currentIndex + upgradeSteps);
        return types[newIndex] as ProjectileType;
    }
}
