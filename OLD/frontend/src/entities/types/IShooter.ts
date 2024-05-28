import { Projectile } from "../projectile/Projectile";

export interface IShooter {
    getNewProjectiles(): Projectile[];
}
