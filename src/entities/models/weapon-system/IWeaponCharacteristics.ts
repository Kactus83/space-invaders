import { ProjectileType } from "../../projectile/ProjectileType";

export interface IWeaponCharacteristics {
    projectileType: ProjectileType;
    fireRate: number;
    shootProbability: number;
}
