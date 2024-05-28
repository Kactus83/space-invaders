import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import UserController from './controllers/UserController';
import { UserRegistrationService } from './services/UserRegistrationService';
import { UserAuthenticationService } from './services/UserAuthenticationService';
import { NonceService } from './services/NonceService';
import UserRepository from './repositories/UserRepository';
import NonceRepository from './repositories/NonceRepository';
import { validateRequest } from './middlewares/validateRequest';
import { classicSignInSchema, classicSignUpSchema, fullSignUpSchema, web3SignInSchema, web3SignUpSchema } from './config/validationSchema';
import { normalizeData } from './middlewares/normalizeData';
import UserProfileService from './services/UserProfileService';
import { authenticateToken } from './middlewares/authenticateToken';

// Initialize express app
const app = express();
const port = process.env.PORT || 3001;

// Initialize repositories
const userRepository = new UserRepository();
const nonceRepository = new NonceRepository();

// Initialisation des services
const nonceService = new NonceService(nonceRepository);
const userprofileService = new UserProfileService(userRepository);
const userRegistrationService = new UserRegistrationService(userRepository, nonceService);
const userAuthenticationService = new UserAuthenticationService(userRepository, nonceService); 

// Initialize controller
const userController = new UserController(userprofileService, userRegistrationService, userAuthenticationService, nonceService);

// Middlewares
app.use(helmet()); // Security middleware for setting various HTTP headers
app.use(cors({
    origin: (origin, callback) => {
        // Allow all requests from localhost
        if (origin === undefined || origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(morgan('dev')); // Logging middleware
app.use(express.json()); // Middleware for parsing application/json

// Routes
// Route for obtaining a nonce
app.get('/nonce/:walletAddress', userController.getMessageForSignature.bind(userController));

// Route for obtaining a user
app.get('/user/profile', authenticateToken, userController.getUserProfile.bind(userController));

// SignUp routes
app.post('/sign-up/classic',
    validateRequest(classicSignUpSchema),
    normalizeData,
    userController.signUp.bind(userController)); // Classic sign-up

app.post('/sign-up/web3',
    validateRequest(web3SignUpSchema),
    normalizeData,
    userController.signUp.bind(userController)); // Web3 sign-up

app.post('/sign-up/full',
    validateRequest(fullSignUpSchema),
    normalizeData,
    userController.signUp.bind(userController)); // Full sign-up

// SignIn routes
app.post('/sign-in',
    validateRequest(classicSignInSchema),
    normalizeData,
    userController.signIn.bind(userController)); // Classic sign-in

app.post('/sign-in/web3',
    validateRequest(web3SignInSchema),
    normalizeData,
    userController.signInWeb3.bind(userController)); // Web3 sign-in

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({
        error: 'An internal error occurred.',
        message: err.message
    });
});

// Start the server
app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
});
