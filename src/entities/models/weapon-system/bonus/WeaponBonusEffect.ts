import { GameBonusType } from "../../../bonus/GameBonusTypes";
import { ProjectileType } from "../../../projectile/ProjectileType";
import { ISystemBonusEffect } from "../../bonus-system/system-bonus/ISystemBonusEffect";
export class WeaponBonusEffect implements ISystemBonusEffect {
    name: GameBonusType;
    casualName: string;
    duration: number;
    upgrade_ProjectileType: number;
    multiplicator_fireRate: number;
    additional_fireRate: number;
    multiplicator_ShootProbability: number;
    additional_ShootProbability: number;
    
    constructor(
        name: GameBonusType,
        casualName: string,
        duration: number,
        additional_fireRate: number,
        multiplicator_fireRate: number,
        upgrade_ProjectileType: number,
        multiplicator_ShootProbability: number,
        additional_ShootProbability: number,
    ) {
        this.name = name;
        this.casualName = casualName;
        this.duration = duration;
        this.additional_fireRate = additional_fireRate;
        this.multiplicator_fireRate = multiplicator_fireRate;
        this.upgrade_ProjectileType = upgrade_ProjectileType;
        this.multiplicator_ShootProbability = multiplicator_ShootProbability;
        this.additional_ShootProbability = additional_ShootProbability;
    }
}