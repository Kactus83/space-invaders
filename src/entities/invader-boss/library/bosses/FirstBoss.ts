import { AppConfig } from "../../../../core/config/AppConfig";
import { GameEntity } from "../../../GameEntity";
import { GameBonusType } from "../../../bonus/GameBonusTypes";
import { Player } from "../../../player/Player";
import { Projectile } from "../../../projectile/Projectile";
import { ProjectileType } from "../../../projectile/ProjectileType";
import { EntityState } from "../../../types/EntityState";
import { Wall } from "../../../wall/Wall";
import { InvaderBoss } from "../../AbstractInvaderBoss";
import { IInvaderBossCharacteristics } from "../../IInvaderBossCharacteristics";

export class FirstBoss extends InvaderBoss {

    private nextLinePosition = 0;
    private horizontalMovementDirection: 'left' | 'right' = 'right';
    
    private static characteristics: IInvaderBossCharacteristics = {
        width: 200,
        height: 200,
        moveSpeed: 20,
        score: 200,
        hp: 250,
        shield: 5,
        damage: 50,
        regenerationRate: 1,
        projectileType: ProjectileType.Ultimate,
        fireRate: 8,
        shootProbability: 0.005,
        emitProbability: 1,
        bonusTypes: [GameBonusType.Health_Double_Shield_30sec, GameBonusType.Weapon_Double_Firerate_20sec, GameBonusType.Experience_Increase_1_Level, GameBonusType.Experience_Increase_1000_Score, GameBonusType.Weapon_Increase_15_FireRate_60sec, GameBonusType.Weapon_Double_Firerate_30sec],
        cooldownRatio: 0.5,
    };

    constructor(initialPosition: { x: number, y: number }) {
        super(FirstBoss.characteristics, initialPosition);
    }

    protected async loadDesign(): Promise<void> {
        // Implémenter le chargement du design spécifique à FirstBoss
    }

    public update(deltaTime: number): void {
        if (!this.fabricObject) return;
    
        this.animationSystem.update(deltaTime);
    
        // Calcul basé sur la taille du boss et la rush line limit
        const config = AppConfig.getInstance();
        if (this.fabricObject.top + 200 <= config.rushLineLimit) {
            // Comportement avant d'atteindre la rush line: descente verticale fixe de 200 pixels à chaque étape
            this.descend(deltaTime);
        } else {
            // Comportement après avoir atteint la rush line: mouvement horizontal avec changement de direction aux bords
            this.horizontalMovement(deltaTime, config);
        }
    }
    
    private descend(deltaTime: number): void {
        const deltaTimeInSeconds = deltaTime / 1000;
        this.fabricObject.top += deltaTimeInSeconds * this.speedSystem.moveSpeed; // Utilisez speedSystem pour contrôler la vitesse de descente
        if (this.fabricObject.top + 200 > this.nextLinePosition) {
            // Préparer la prochaine ligne de descente après chaque mouvement
            this.nextLinePosition = this.fabricObject.top + 200;
        }
    }
    
    private horizontalMovement(deltaTime: number, config: AppConfig): void {
        const deltaTimeInSeconds = deltaTime / 1000;
        const potentialMove = this.speedSystem.moveSpeed * deltaTimeInSeconds * (this.horizontalMovementDirection === 'right' ? 1 : -1);
    
        // Changement de direction aux bords du canvas
        if (this.fabricObject.left + potentialMove < 0 || this.fabricObject.left + potentialMove + this.fabricObject.width > config.canvasWidth) {
            this.horizontalMovementDirection = this.horizontalMovementDirection === 'right' ? 'left' : 'right';
        } else {
            this.fabricObject.left += potentialMove;
        }
    }
    public onCollisionWith(entity: GameEntity): void {
        if (entity instanceof Player) {
            this.healthSystem.onCollision(entity.healthSystem);
            if (this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }
        } else if (entity instanceof Projectile) {
            if (entity.origin instanceof InvaderBoss) {
                return;
            }
            this.healthSystem.onCollision(entity.healthSystem);
            if (this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }
        } else if (entity instanceof Wall) {
            this.healthSystem.onCollision(entity.healthSystem);
            if (this.healthSystem.health <= 0) {
                this.state = EntityState.ToBeRemoved;
            }
        }
        // Pas besoin de gérer les collisions avec GroundLine ou autres Invaders pour un Boss
    }    
}