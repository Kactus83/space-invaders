import PlayerProfileRepository from '../repositories/PlayerProfileRepository';
import { FullPlayerProfile } from '../models/player/FullPlayerProfile';

export default class PlayerProfileService {
    private playerProfileRepository: PlayerProfileRepository;

    constructor(playerProfileRepository: PlayerProfileRepository) {
        this.playerProfileRepository = playerProfileRepository;
    }

    /**
     * Retrieve the player profile by user ID.
     *
     * @param userId The ID of the user.
     * @returns The player profile if found, otherwise null.
     */
    public async getPlayerProfileByUserId(userId: number): Promise<FullPlayerProfile | null> {
        return this.playerProfileRepository.getPlayerProfileByUserId(userId);
    }

    /**
     * Create a new player profile for a user.
     *
     * @param profile Data for the new player profile.
     * @returns The created player profile.
     */
    public async createPlayerProfile(profile: FullPlayerProfile): Promise<FullPlayerProfile> {
        return this.playerProfileRepository.createPlayerProfile(profile);
    }
}
