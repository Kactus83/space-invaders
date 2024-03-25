import { Projectile } from "../projectile/Projectile";

export interface IShooter {
    onShoot(callback: (projectile: Projectile) => void): void;
}
