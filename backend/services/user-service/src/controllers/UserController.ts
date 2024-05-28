import { Request, Response } from 'express';
import { UserRegistrationService } from '../services/UserRegistrationService';
import { UserAuthenticationService } from '../services/UserAuthenticationService';
import { NonceService } from '../services/NonceService';
import JWTUtil from '../utils/JWTUtil';
import { ClassicSignUpRequest } from '../models/sign-up/ClassicSignUpRequest';
import { Web3SignUpRequest } from '../models/sign-up/Web3SignUpRequest';
import { FullSignUpRequest } from '../models/sign-up/FullSignUpRequest';
import { ClassicSignInRequest } from '../models/sign-in/ClassicSignInRequest';
import { Web3SignInRequest } from '../models/sign-in/Web3SignInRequest';
import UserProfileService from '../services/UserProfileService';


export default class UserController {
    private userProfileService: UserProfileService;
    private userRegistrationService: UserRegistrationService;
    private userAuthenticationService: UserAuthenticationService;
    private nonceService: NonceService;

    constructor(
        userProfileService: UserProfileService,
        userRegistrationService: UserRegistrationService,
        userAuthenticationService: UserAuthenticationService,
        nonceService: NonceService
    ) {
        this.userProfileService = userProfileService;
        this.userRegistrationService = userRegistrationService;
        this.userAuthenticationService = userAuthenticationService;
        this.nonceService = nonceService;
    }

    /**
     * Handles user registration requests.
     * The signature verification is handled by a middleware.
     */
    public async signUp(req: Request<{}, {}, ClassicSignUpRequest | Web3SignUpRequest | FullSignUpRequest>, res: Response): Promise<void> {
        console.log("signUp", req.body);
        try {
            const signUpData = req.body;
            const newUser = await this.userRegistrationService.registerUser(signUpData);
            res.status(201).json({ user: { ...newUser, password: undefined } }); 
        } catch (error) {
            const e = error as Error;
            res.status(500).send({
                error: 'An internal error occurred during sign up.',
                message: e.message
            });
        }
    }

    /**
     * Handles standard sign-in requests.
     */
    public async signIn(req: Request<{}, {}, ClassicSignInRequest>, res: Response): Promise<void> {
        console.log("signIn", req.body);
        try {
            const signInData = req.body;
            const user = await this.userAuthenticationService.authenticateUser(signInData);
            
            // Générer un token pour l'utilisateur
            const accessToken = JWTUtil.generateToken(user.id);
            
            // Renvoyer les informations de l'utilisateur et le token (sans renvoyer le mot de passe)
            res.status(200).json({ user: { ...user, password: undefined }, accessToken });
        } catch (error) {
            const e = error as Error;
            res.status(400).send({
                error: 'Error during standard sign in.',
                message: e.message
            });
        }
    }

    /**
     * Handles Web3 sign-in requests.
     */
    public async signInWeb3(req: Request<{}, {}, Web3SignInRequest>, res: Response): Promise<void> {
        console.log("signInWeb3", req.body);
        try {
            const signInData = req.body;
            console.log("signInData", signInData); 
            const user = await this.userAuthenticationService.authenticateUserWeb3(signInData);
            const accessToken = JWTUtil.generateToken(user.id);
            res.status(200).json({ user: { ...user, password: undefined }, accessToken });
        } catch (error) {
            const e = error as Error;
            res.status(400).send({
                error: 'Error during Web3 sign in.',
                message: e.message
            });
        }
    }

    /**
     * Retrieves a nonce for signature based on the wallet address.
     */
    public async getMessageForSignature(req: Request, res: Response): Promise<void> {
        try {
            const walletAddress = req.params.walletAddress;
            console.log("message requested for signature");
            const message = await this.userAuthenticationService.getMessageForSignature(walletAddress);
            res.status(200).json(message);
        } catch (error) {
            const e = error as Error;
            res.status(500).send({
                error: 'An internal error occurred while retrieving the nonce.',
                message: e.message
            });
        }
    }

    /**
     * Retrieve the profile of the currently authenticated user.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns The user profile response.
     */
    public async getUserProfile(req: Request, res: Response): Promise<Response> {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(401).send({ error: 'No authorization header provided.' });
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send({ error: 'No token provided.' });
            }

            const decoded = JWTUtil.verifyToken(token);
            const userId: number = decoded.userId;

            const userProfile = await this.userProfileService.getUserProfile(userId);
            if (!userProfile) {
                return res.status(404).send({ error: 'User profile not found.' });
            }
            return res.status(200).json(userProfile);
        } catch (error) {
            const e = error as Error;
            return res.status(500).send({
                error: 'An internal error occurred while retrieving the user profile.',
                message: e.message
            });
        }
    }         
}
