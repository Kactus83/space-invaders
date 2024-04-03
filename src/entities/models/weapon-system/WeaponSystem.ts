import { GameEntity } from "../../GameEntity";
import { Player } from "../../player/Player";
import { Projectile } from "../../projectile/Projectile";
import { ProjectileType } from "../../projectile/ProjectileType";
import { BonusReceiverTemplate } from "../bonus-system/bonus-receiver/BonusReceiverTemplate";
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
        const bounds = this.owner.getCollisionBounds();
        const x_Origin:number = bounds.x + bounds.width / 2;
        let temp_Y: number;
        if(this.owner instanceof Player) {
            temp_Y = bounds.y - bounds.height / 2;
        }else{
            temp_Y = bounds.y + bounds.height / 2;
        }
        const y_Origin:number = temp_Y;
        if (timeSinceLastShoot >= 1000 / this.effectiveFireRate) {
            if (Math.random() <= this.effectiveShootProbability) {
                const projectile = new Projectile(
                    this.owner, 
                    this.effectiveProjectileType, 
                    { x: x_Origin, y: y_Origin }
                );
                await projectile.init();
                this.newProjectiles.push(projectile);
                this.lastShootTime = currentTime;
            }
        }
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
            probability *= effect.multiplicator_ShootProbability;
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
