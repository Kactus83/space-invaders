import { WebSocket } from 'ws';

export class GameEngine {
    private lastFrameTimeMs: number = 0;
    private ws: WebSocket;
    private syncInterval: number = 1000; // Sync interval in milliseconds

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.start();
    }

    private async start(): Promise<void> {
        this.gameLoop();
    }

    private gameLoop(): void {
        const deltaTime = Date.now() - this.lastFrameTimeMs;
        this.lastFrameTimeMs = Date.now();

        if (deltaTime >= this.syncInterval) {
            this.synchronize();
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    private synchronize(): void {
        const gameState = {};
        this.ws.send(JSON.stringify(gameState));
    }
}
