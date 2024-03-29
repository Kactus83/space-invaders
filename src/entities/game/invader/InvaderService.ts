import { Invader } from './Invader';
import { ThemeManager } from '../../../themes/ThemeManager';
import { fabric } from 'fabric';
import { InvaderType } from './InvaderType';
import { config } from '../../../config/config';
import { assembleWavePattern } from './lib/invaderConfigurations';
import { ProjectileService } from '../projectile/ProjectileService';

export class InvaderService {
    private invaders: Invader[] = [];
    private themeManager: ThemeManager;
    private projectileService: ProjectileService;

    constructor(themeManager: ThemeManager, projectileService: ProjectileService) {
        this.themeManager = themeManager;
        this.projectileService = projectileService;
    }

    public async createInvader(type: InvaderType, x: number, y: number): Promise<void> {
        const newInvader = new Invader(this.themeManager, type, x, y, this.projectileService);
        await newInvader.loadDesign();
        if (!newInvader || !newInvader.fabricObject) {
            console.error("Failed to create an invader", {type, x, y});
            throw new Error("Failed to create an invader");
        }
        this.invaders.push(newInvader);
    }
        

    public async initializeWave(waveKey: string): Promise<void> {
        const wavePattern = assembleWavePattern(waveKey);
        this.cleanup();
        
        let invaderCreationPromises: Promise<void>[] = [];
        let currentX = config.invader.startX;
        let currentY = config.invader.startY;
    
        wavePattern.forEach((row, rowIndex) => {
            row.forEach(async (type, colIndex) => {
                if (type === InvaderType.None) return;
    
                const x = currentX + colIndex * config.invader.spacingX;
                const y = currentY + rowIndex * config.invader.spacingY;
                let newInvader = this.createInvader(type, x, y);
                invaderCreationPromises.push(newInvader);
            });
            currentX = config.invader.startX;
            currentY += config.invader.spacingY;
        });
    
        await Promise.all(invaderCreationPromises);
        console.log(`Initialized wave: ${waveKey}`, this.invaders.length, 'invaders');
    }

    public update(deltaTime: number): void {
        this.invaders.forEach(invader => {
            invader.update(deltaTime);
            invader.shoot();
        });
    }

    public getFabricObjects(): fabric.Object[] {
        return this.invaders.map(invader => invader.fabricObject);
    }

    public getInvaders(): Invader[] {
        return this.invaders;
    }

    public removeInvader(id: number): void {
        this.invaders = this.invaders.filter(invader => invader.id !== id);
    }

    public cleanup(): void {
        this.invaders = [];
    }
}
