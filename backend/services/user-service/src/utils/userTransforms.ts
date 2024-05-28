import { User } from '../models/user/User';
import { FrontendUser } from '../models/user/FrontendUser';

/**
 * Converts a User object to a FrontendUser object.
 * This function ensures that only the necessary and non-sensitive
 * user information is sent to the frontend.
 * 
 * @param user The User object to convert.
 * @returns The FrontendUser object.
 */
export const toFrontendUser = (user: User): FrontendUser => {
    return {
        id: user.id,
        name: user.name,
        wallet: user.wallet,
        email: user.email,
        avatar: user.avatar,
        status: user.status
    };
};