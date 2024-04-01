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
        if (timeSinceLastShoot >= 1000 / this.fireRate) {
            if (Math.random() <= this.shootProbability) {
                const projectile = new Projectile(
                    this.owner, 
                    this.projectileType, 
                    { x: x_Origin, y: y_Origin }
                );
                await projectile.init();
                this.newProjectiles.push(projectile);
                this.lastShootTime = currentTime;
            }
        }
    }

    public getNewProjectiles(): Projectile[] {
        const projectiles = [...this.newProjectiles];
        this.newProjectiles = [];
        return projectiles;
    }
}
