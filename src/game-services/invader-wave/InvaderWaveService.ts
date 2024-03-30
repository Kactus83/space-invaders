import { Invader } from "../../entities/invader/Invader";
import { InvaderType } from "../../entities/invader/InvaderType";
import { AppConfig } from "../../core/config/AppConfig";
import { maxWave, waveConfigs } from "./waves/wavesConfig";
import { WaveInvaderConfig } from "./types/WaveInvaderConfig";
import { InvaderSpecs } from "../../entities/invader/InvaderTypesSpecs";

export class InvaderWaveService {
    public isInit: boolean = false;
    private nextWaveTime: number = 0;
    private currentWaveIndex: number = 0;
    private pendingInvaders: Invader[] = [];
    private allWavesLaunched: boolean = false;
    private config = AppConfig.getInstance();

    constructor() {
        this.scheduleNextWave();
    }

    private scheduleNextWave(): void {
        console.log('scheduleNextWave', this.currentWaveIndex, waveConfigs.length);
        if (this.currentWaveIndex < waveConfigs.length) {
            this.nextWaveTime = waveConfigs[this.currentWaveIndex].delay * 1000;
        }
    }

    async update(deltaTime: number): Promise<void> {
        this.nextWaveTime -= deltaTime;
        if (this.nextWaveTime <= 0) {
            if (this.currentWaveIndex < waveConfigs.length) {
                this.scheduleNextWave();
                this.isInit = true;
                const waveConfig = waveConfigs[this.currentWaveIndex++];
                await this.launchWave(waveConfig.invaders);
            } else if (!this.allWavesLaunched) {
                this.allWavesLaunched = true;
            }
        }
    }

    private async launchWave(invadersConfig: WaveInvaderConfig[]): Promise<void> {
        const canvasWidth = this.config.canvasWidth;
        for (const { type, count, row } of invadersConfig) {
            const specs = InvaderSpecs[type];
            const lineHeight = specs.height <= 50 ? 50 : 100; // Hauteur de la ligne basée sur la hauteur de l'invader
            const verticalOffset = (lineHeight - specs.height) / 2; // Décalage pour centrer l'invader
            const yPosition = -row * lineHeight + verticalOffset; // Ajustement de la position Y en conséquence
    
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


    get allWavesCompleted(): boolean {
        return this.allWavesLaunched && this.pendingInvaders.length === 0;
    }
}