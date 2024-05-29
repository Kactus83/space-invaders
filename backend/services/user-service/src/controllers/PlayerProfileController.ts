import { Request, Response } from 'express';
import PlayerProfileService from '../services/PlayerProfileService';
import { FullPlayerProfile } from '../models/player/FullPlayerProfile';

export default class PlayerProfileController {
    private playerProfileService: PlayerProfileService;

    constructor(playerProfileService: PlayerProfileService) {
        this.playerProfileService = playerProfileService;
    }

    /**
     * Retrieve the player profile of the currently authenticated user.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns The player profile response.
     */
    public async getPlayerProfile(req: Request, res: Response): Promise<Response> {
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

            const playerProfile = await this.playerProfileService.getPlayerProfileByUserId(userId);
            if (!playerProfile) {
                return res.status(404).send({ error: 'Player profile not found.' });
            }
            return res.status(200).json(playerProfile);
        } catch (error) {
            const e = error as Error;
            return res.status(500).send({
                error: 'An internal error occurred while retrieving the player profile.',
                message: e.message
            });
        }
    }

    /**
     * Create a new player profile for a user.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns The created player profile.
     */
    public async createPlayerProfile(req: Request, res: Response): Promise<void> {
        try {
            const profileData: FullPlayerProfile = req.body;
            const newProfile = await this.playerProfileService.createPlayerProfile(profileData);
            res.status(201).json(newProfile);
        } catch (error) {
            const e = error as Error;
            res.status(500).send({
                error: 'An internal error occurred during player profile creation.',
                message: e.message
            });
        }
    }
}
