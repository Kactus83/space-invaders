import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
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

// Route de base
app.get('/', (req, res) => res.send('Auth Service Running'));

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Auth Service listening at http://localhost:${port}`);
});
