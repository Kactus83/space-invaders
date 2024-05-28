import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { WebSocketServer, WebSocket } from 'ws';
import { GameEngine } from './game/GameEngine';

const app = express();
const port = process.env.PORT || 3003;

// Middlewares
app.use(cors({
    origin: (origin, callback) => {
        // Permettre toutes les requêtes de localhost, peu importe le port
        if (origin === undefined || origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Points de terminaison de l'API
//   ...
//   ...

// Gestion des erreurs (Middleware)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack); // Log l'erreur dans la console du serveur
    res.status(500).send({
        error: 'Une erreur interne est survenue.',
        message: err.message
    });
});

// Démarrage du serveur HTTP
const server = app.listen(port, () => {
    console.log(`Engine Service listening at http://localhost:${port}`);
});

// Configuration WebSocket
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    const engine = new GameEngine(ws);

    ws.on('message', (message) => {
        // Handle incoming messages from the client
        const data = JSON.parse(message.toString());
        // Process data and update game state
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
