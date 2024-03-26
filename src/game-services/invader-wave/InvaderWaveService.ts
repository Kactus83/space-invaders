import { Invader } from "../../entities/invader/Invader";
import { InvaderType } from "../../entities/invader/InvaderType";
import { AppConfig } from "../../core/config/AppConfig";
import { waveConfigs } from "./waves/wavesConfig";
import { WaveInvaderConfig } from "./types/WaveInvaderConfig";

export class InvaderWaveService {
    private nextWaveTime: number = 0;
    private currentWaveIndex: number = 0;
    private pendingInvaders: Invader[] = [];
    private config = AppConfig.getInstance();

    constructor() {
        this.scheduleNextWave();
    }

    private scheduleNextWave(): void {
        if (this.currentWaveIndex < waveConfigs.length) {
            this.nextWaveTime = waveConfigs[this.currentWaveIndex].delay;
        }
    }

    async update(deltaTime: number): Promise<void> {
        this.nextWaveTime -= deltaTime;
        if (this.nextWaveTime <= 0 && this.currentWaveIndex < waveConfigs.length) {
            const waveConfig = waveConfigs[this.currentWaveIndex++];
            await this.launchWave(waveConfig.invaders);
            this.scheduleNextWave();
        }
    }

    private async launchWave(invadersConfig: WaveInvaderConfig[]): Promise<void> {
        const canvasWidth = this.config.canvasWidth;
        for (const { type, count, row } of invadersConfig) {
            const yPosition = -row * 60; // Position juste au-dessus du canvas
            const spacing = canvasWidth / (count + 1);
            for (let i = 0; i < count; i++) {
                const xPosition = (i + 1) * spacing;
                const invader = new Invader(type, { x: xPosition, y: yPosition });
                await invader.init(); // Assurez-vous que chaque invader est correctement initialisé
                this.pendingInvaders.push(invader);
            }
        }
    }

    getPendingInvaders(): Invader[] {
        const invaders = [...this.pendingInvaders];
        this.pendingInvaders = [];
        return invaders;
    }
}