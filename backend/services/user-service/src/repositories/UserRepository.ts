import { pool } from '../config/database';
import { User } from '../models/user/User';

export default class UserRepository {

    /**
     * Create a new user in the database.
     *
     * @param user Data for the new user.
     * @returns The created user.
     */
    public async createUser(user: User): Promise<User> {
        const { name, wallet, email, password, company, isWalletVerified, isEmailVerified, isLocked, createdAt, updatedAt } = user;

        const result = await pool.query(
            "INSERT INTO users (name, wallet, email, password, company, isWalletVerified, isEmailVerified, isLocked, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, name, wallet, email, company, createdAt, updatedAt",
            [
                name,
                wallet,
                email,
                password,
                company,
                isWalletVerified,
                isEmailVerified,
                isLocked,
                createdAt,
                updatedAt
            ]
        );
        return result.rows[0];
    }

    /**
     * Retrieve a user by their email.
     *
     * @param email The email of the user.
     * @returns The user if found, otherwise null.
     */
    public async getUserByEmail(email: string): Promise<User | null> {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    /**
     * Retrieve a user by their wallet address.
     *
     * @param walletAddress The wallet address of the user.
     * @returns The user if found, otherwise null.
     */
    public async getUserByWalletAddress(walletAddress: string): Promise<User | null> {
        const result = await pool.query(
            "SELECT * FROM users WHERE wallet = $1",
            [walletAddress]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }
    
    /**
     * Retrieve a user by their ID.
     *
     * @param id The ID of the user.
     * @returns The user if found, otherwise null.
     */
    public async getUserById(id: number): Promise<User | null> {
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }
}
