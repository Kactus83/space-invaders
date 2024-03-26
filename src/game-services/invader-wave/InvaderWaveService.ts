import { Invader } from "../../entities/invader/Invader";
import { InvaderType } from "../../entities/invader/InvaderType";
import { IWaveSubscriber } from "./IWaveSubscriber";

export class InvaderWaveService {
    private subscribers: IWaveSubscriber[] = [];
    private waveInterval: number = 5000; // Interval en ms entre les vagues
    private waveTimer: number = 0;

    constructor() {}

    subscribe(subscriber: IWaveSubscriber): void {
        this.subscribers.push(subscriber);
    }

    update(deltaTime: number): void {
        this.waveTimer += deltaTime;

        if (this.waveTimer >= this.waveInterval) {
            this.spawnWave();
            this.waveTimer = 0;
        }
    }

    private spawnWave(): void {
        // Logique pour déterminer la composition de la vague et créer les invaders
        const newInvaders = this.generateInvadersForWave();
        
        newInvaders.forEach(invader => {
            this.subscribers.forEach(subscriber => subscriber.onInvaderSpawn(invader));
        });
    }

    private generateInvadersForWave(): Invader[] {
        // Implémentez la logique de création des invaders pour une vague ici
        // Exemple simple :
        const invaders: Invader[] = [];
        for (let i = 0; i < 5; i++) {
            const position = { x: 100 * i, y: 50 }; // Position de départ simplifiée
            invaders.push(new Invader(InvaderType.Basic, position));
        }
        return invaders;
    }
}
