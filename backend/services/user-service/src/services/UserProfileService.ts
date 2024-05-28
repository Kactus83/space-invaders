import UserRepository from '../repositories/UserRepository';
import { toFrontendUser } from '../utils/userTransforms';
import { User } from '../models/user/User';
import { FrontendUser } from '../models/user/FrontendUser';

export default class UserProfileService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieve the profile of the currently authenticated user.
     *
     * @param userId The ID of the user.
     * @returns The user profile if found, otherwise null.
     */
    public async getUserProfile(userId: number): Promise<FrontendUser | null> {
        const user: User | null = await this.userRepository.getUserById(userId);
        if (!user) {
            return null;
        }
        return toFrontendUser(user);
    }
}