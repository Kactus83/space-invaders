import { pool } from '../config/database';

export default class NonceRepository {

    /**
     * Create a new nonce in the database for a specific wallet.
     *
     * @param walletAddress The wallet address.
     * @param nonce The nonce to be set.
     */
    public async createNonce(walletAddress: string, nonce: string): Promise<void> {
        await pool.query(
            "INSERT INTO nonces (wallet, nonce, expiration) VALUES ($1, $2, NOW() + INTERVAL '1 HOUR')",
            [walletAddress, nonce]
        );
    }

    /**
     * Update the nonce and expiration for a specific wallet in the database.
     *
     * @param walletAddress The wallet address.
     * @param nonce The new nonce to be set.
     */
    public async updateNonce(walletAddress: string, nonce: string): Promise<void> {
        await pool.query(
            "UPDATE nonces SET nonce = $2, expiration = NOW() + INTERVAL '1 HOUR' WHERE wallet = $1",
            [walletAddress, nonce]
        );
    }

    /**
     * Check if a nonce already exists for a specific wallet.
     *
     * @param walletAddress The wallet address.
     * @returns True if a nonce exists, otherwise false.
     */
    public async checkIfNonceExists(walletAddress: string): Promise<boolean> {
        const result = await pool.query(
            "SELECT 1 FROM nonces WHERE wallet = $1",
            [walletAddress]
        );
        return (result.rowCount ?? 0) > 0;
    }

    /**
     * Find the most recent nonce and its expiration time for a specific wallet.
     *
     * @param walletAddress The wallet address.
     * @returns The nonce and its expiration time if exists, otherwise null.
     */
    public async findNonce(walletAddress: string): Promise<{ nonce: string, expiration: Date } | null> {
        const result = await pool.query(
            "SELECT nonce, expiration FROM nonces WHERE wallet = $1 AND expiration > NOW()",
            [walletAddress]
        );
        if (result.rows.length > 0) {
            return {
                nonce: result.rows[0].nonce,
                expiration: new Date(result.rows[0].expiration)
            };
        } else {
            return null;
        }
    }
}
