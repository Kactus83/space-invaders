import express from 'express';
import { NavigationController } from './controllers/NavigationController';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3002; 
const navigationController = new NavigationController();

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
app.get('/navigation', navigationController.getNavigation);

// Gestion des erreurs (Middleware)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack); // Log l'erreur dans la console du serveur
    res.status(500).send({
        error: 'Une erreur interne est survenue.',
        message: err.message
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Navigation Service listening at http://localhost:${port}`);
});
