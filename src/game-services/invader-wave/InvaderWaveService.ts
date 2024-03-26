import { Invader } from "../../entities/invader/Invader";
import { InvaderType } from "../../entities/invader/InvaderType";
import { AppConfig } from "../../core/config/AppConfig";

export class InvaderWaveService {
    private pendingInvaders: Invader[] = [];
    private waves: Array<{ delay: number, invaders: Promise<Invader[]> }> = [];
    private timeSinceLastWave: number = 0;
    private config = AppConfig.getInstance();

    constructor() {}

    async prepareWaves() {
        for (let waveNumber = 1; waveNumber <= 3; waveNumber++) {
            // Notez que createWaveInvaders retourne maintenant une Promise
            const invadersPromise = this.createWaveInvaders(waveNumber * 5, waveNumber);
            const delay = waveNumber * 10000; // 10 secondes entre chaque vague
            this.waves.push({ delay, invaders: invadersPromise });
        }
    }

    private async createWaveInvaders(numberOfInvaders: number, waveIndex: number): Promise<Invader[]> {
        const invaders: Invader[] = [];
        const canvasWidth = this.config.canvasWidth;
        const invaderSpacing = canvasWidth / (numberOfInvaders + 1);
        
        for (let i = 0; i < numberOfInvaders; i++) {
            const position = { x: invaderSpacing * (i + 1), y: 50 + (waveIndex * 100) };
            const invader = new Invader(InvaderType.Basic, position);
            await invader.init(); // Assurez-vous que chaque invader est initialisé
            invaders.push(invader);
        }
        return invaders;
    }

    async update(deltaTime: number): Promise<void> {
        this.timeSinceLastWave += deltaTime;
        
        if (this.waves.length > 0 && this.timeSinceLastWave >= this.waves[0].delay) {
            const invaders = await this.waves[0].invaders; 
            this.pendingInvaders = this.pendingInvaders.concat(invaders);
            this.waves.shift(); 
            this.timeSinceLastWave = 0; 
        }
    }

    getPendingInvaders(): Invader[] {
        const invadersToSpawn = this.pendingInvaders;
        this.pendingInvaders = [];
        return invadersToSpawn;
    }
}
