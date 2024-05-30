import { WebSocket } from 'ws';

export class GameEngine {
    private lastFrameTimeMs: number = 0;
    private ws: WebSocket;
    private syncInterval: number = 1000; // Sync interval in milliseconds
    private intervalId: NodeJS.Timeout;

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.start();
    }

    private start(): void {
        this.intervalId = setInterval(() => this.gameLoop(), 1000 / 60); // 60 FPS
    }

    private gameLoop(): void {
        const now = Date.now();
        const deltaTime = now - this.lastFrameTimeMs;
        this.lastFrameTimeMs = now;

        if (deltaTime >= this.syncInterval) {
            this.synchronize();
        }
    }

    private synchronize(): void {
        const gameState = {};
        this.ws.send(JSON.stringify(gameState));
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
