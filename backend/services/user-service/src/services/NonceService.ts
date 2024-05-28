import NonceRepository from '../repositories/NonceRepository';

export class NonceService {
    private nonceRepository: NonceRepository;

    constructor(nonceRepository: NonceRepository) {
        this.nonceRepository = nonceRepository;
    }

    /**
     * Generate and store or update a nonce for the specified wallet address.
     * This nonce is used for signing purposes to ensure each session is unique.
     *
     * @param walletAddress The wallet address for which the nonce is generated or updated.
     * @returns The generated nonce.
     */
    public async getNonceForSignature(walletAddress: string): Promise<string> {

        const nonce = this.generateNonce(32);
        const nonceExists = await this.nonceRepository.checkIfNonceExists(walletAddress);
        if (nonceExists) {
            await this.nonceRepository.updateNonce(walletAddress, nonce);
        } else {
            await this.nonceRepository.createNonce(walletAddress, nonce);
        }
        console.log('Nonce generated:', nonce);
        return nonce;
    }

    /**
     * Retrieve a nonce for the specified wallet address for verification purposes.
     * The nonce must be valid (i.e., not expired).
     *
     * @param walletAddress The wallet address for which the nonce is retrieved.
     * @returns The nonce if it's valid.
     * @throws Error if the nonce is invalid or expired.
     */
    public async getNonceForVerification(walletAddress: string): Promise<string> {
        const nonceData = await this.nonceRepository.findNonce(walletAddress);
        if (!nonceData || new Date(nonceData.expiration).getTime() <= new Date().getTime()) {
            throw new Error('Nonce invalid or expired.');
        }
        console.log('Nonce retrieved:', nonceData.nonce);
        return nonceData.nonce;
    }

    /**
     * Generate a random nonce with uppercase and lowercase letters, numbers, and special characters.
     * @param length The length of the nonce.
     * @returns The generated nonce.
     */
    private generateNonce(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let nonce = '';
        for (let i = 0; i < length; i++) {
            nonce += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return nonce;
    }
}
