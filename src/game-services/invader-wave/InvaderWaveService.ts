import { Invader } from "../../entities/invader/Invader";
import { AppConfig } from "../../core/config/AppConfig";
import { WaveInvaderConfig } from "./types/WaveInvaderConfig";
import { InvaderSpecs } from "../../entities/invader/InvaderTypesSpecs";
import { PlayerProfile } from "../player-profile/PlayerProfile";
import { waveSetsConfig } from "./waves/waveSetsConfig";
import { WaveConfig } from "./types/WaveConfig";

export class InvaderWaveService {
    public isInit: boolean = false;
    private nextWaveTime: number = 0;
    private currentWaveIndex: number = 0;
    private pendingInvaders: Invader[] = [];
    private allWavesLaunched: boolean = false;
    private config = AppConfig.getInstance();
    private waveConfigs: WaveConfig[] = [];

    constructor() {
        this.scheduleNextWave();
    }

    private scheduleNextWave(): void {
        
        const totalExperience = PlayerProfile.getInstance().getExperience().getTotalExperiencePoints();
        const config = waveSetsConfig.find(set => totalExperience >= set.experienceThreshold);

        if (config) {
            this.waveConfigs = config.waveConfigs;
        } else {
            console.error("No wave configuration found for the current experience level.");
            // Gérez l'absence de configuration, par exemple en utilisant une configuration par défaut
            this.waveConfigs = []; // Ou une configuration par défaut
        }

        console.log('scheduleNextWave', this.currentWaveIndex, this.waveConfigs.length);
        if (this.currentWaveIndex < this.waveConfigs.length) {
            this.nextWaveTime = this.waveConfigs[this.currentWaveIndex].delay * 1000;
        }
    }

    async update(deltaTime: number): Promise<void> {
        this.nextWaveTime -= deltaTime;
        if (this.nextWaveTime <= 0) {
            if (this.currentWaveIndex < this.waveConfigs.length) {
                this.scheduleNextWave();
                this.isInit = true;
                const waveConfig = this.waveConfigs[this.currentWaveIndex++];
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

    public reset(): void {
        this.isInit = false;
        this.nextWaveTime = 0;
        this.currentWaveIndex = 0;
        this.pendingInvaders = [];
        this.allWavesLaunched = false;
    }
    
}