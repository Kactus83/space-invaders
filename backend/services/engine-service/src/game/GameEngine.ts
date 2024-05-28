import { WebSocket } from 'ws';

export class GameEngine {
    private lastFrameTimeMs: number = 0;
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.start();
    }

    private async start(): Promise<void> {
        this.gameLoop();
    }

    private gameLoop(): void {
        setInterval(() => {
            const deltaTime = Date.now() - this.lastFrameTimeMs;
            this.lastFrameTimeMs = Date.now();
            this.synchronize();
        }, 1000 / 60); // Run at 60 FPS
    }

    private synchronize(): void {
        const gameState = {};
        this.ws.send(JSON.stringify(gameState));
    }
}
