import bcrypt from 'bcrypt';

export default class HashingUtil {
    /**
     * Hashes a password using bcrypt.
     * 
     * @param password The password to hash.
     * @returns The hashed password.
     */
    public static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    /**
     * Verifies a password against a hash using bcrypt.
     * 
     * @param password The plain text password.
     * @param hash The hash to verify against.
     * @returns True if the password matches the hash, false otherwise.
     */
    public static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
