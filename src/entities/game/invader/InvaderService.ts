import { Invader } from './Invader';
import { ThemeManager } from '../../../themes/ThemeManager';
import { fabric } from 'fabric';
import { InvaderType } from './InvaderType';
import { config } from '../../../config/config';
import { assembleWavePattern } from './lib/invaderConfigurations';

export class InvaderService {
    private invaders: Invader[] = [];
    private themeManager: ThemeManager;

    constructor(themeManager: ThemeManager) {
        this.themeManager = themeManager;
    }

    public async createInvader(type: InvaderType, x: number, y: number): Promise<void> {
        const newInvader = new Invader(this.themeManager, type, x, y);
        await newInvader.loadDesign();
        this.invaders.push(newInvader);
    }    

    public async initializeWave(waveKey: string): Promise<void> {
        // Assemblez le pattern de la vague spécifiée
        const wavePattern = assembleWavePattern(waveKey);
        // Supprimez les anciens invaders avant d'initialiser la nouvelle vague
        this.cleanup();

        // Utilisez les configurations globales pour la position de départ
        let currentX = config.invader.startX;
        let currentY = config.invader.startY;

        // Itérez sur chaque ligne et colonne du pattern
        wavePattern.forEach((row, rowIndex) => {
            row.forEach(async (type, colIndex) => {
                // Ignorez les types 'None'
                if (type === InvaderType.None) return;

                const x = currentX + colIndex * config.invader.spacingX;
                const y = currentY + rowIndex * config.invader.spacingY;

                // Créez et initialisez l'invader
                await this.createInvader(type, x, y);
            });
            // Réinitialisez la position X et augmentez Y après chaque ligne
            currentX = config.invader.startX;
            currentY += config.invader.spacingY;
        });
    }   

    public update(deltaTime: number): void {
        this.invaders.forEach((invader, index) => {
            invader.update(deltaTime);

            // Supprimer l'invader si ses points de vie tombent à zéro
            if (invader.hp <= 0) {
                this.invaders.splice(index, 1);
                // Éventuellement, gérer le score ici
            }
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
