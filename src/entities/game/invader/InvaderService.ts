import { Invader } from './Invader';
import { ThemeManager } from '../../../themes/ThemeManager';
import { fabric } from 'fabric';
import { InvaderType } from './InvaderType';

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

    public async initializeWave(): Promise<void> {
        const numberOfRows = 3;
        const numberOfInvadersPerRow = 10;
        const invaderSpacingX = 70;
        const invaderSpacingY = 120;
        const startX = 100;
        const startY = 50;
        const types = [InvaderType.Basic, InvaderType.Advanced, InvaderType.Elite];
    
        let invaderCreationPromises = [];
    
        for (let row = 0; row < numberOfRows; row++) {
            for (let col = 0; col < numberOfInvadersPerRow; col++) {
                const x = startX + col * invaderSpacingX;
                const y = startY + row * invaderSpacingY;
                const type = types[row % types.length];
                // Stockez les promesses de création des invaders pour attendre leur complétion plus tard
                invaderCreationPromises.push(this.createInvader(type, x, y));
            }
        }
    
        // Attend que tous les invaders soient créés et que leurs designs soient chargés
        await Promise.all(invaderCreationPromises);
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

    public cleanup(): void {
        this.invaders = [];
    }
}
